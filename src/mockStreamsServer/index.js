import axios from 'axios'
import dayjs from 'dayjs'

import {
  ARENA_ENDPOINT_STREAMS,
  TRELLO_ACTIONS_ENDPOINT,
  DROPBOX_TEAM_LOG_EVENTS_ENDPOINT
} from './endpoints'
import {
  ARENA,
  DROPBOX,
  GITHUB,
  SLACK,
  TRELLO,
  DATE_FORMAT,
  ISSUES_EVENT,
  ISSUE_COMMENT_EVENT
} from '../constants'
import { TRELLO_TOKEN, TRELLO_KEY, DROPBOX_TOKEN } from '../secrets'

import { flatten2DArray } from '../utils'

class MockStreamsServer {
  constructor() {
    this.database = {
      events: [],
      users: {},
      types: new Set([]),
      issues: {}
    }
  }

  getEvents = () => {
    return this.database.events
  }

  getUsers = () =>
    Object.keys(this.database.users).map(userId => this.database.users[userId])

  getTypes = () => [...this.database.types]

  getIssues = () =>
    Object.keys(this.database.issues)
      .map(issueId => this.database.issues[issueId])
      .sort((eventA, eventB) =>
        dayjs(eventA.createdAt).isAfter(dayjs(eventB.createdAt)) ? -1 : 1
      )

  fetchEvents = async (streamSettings, { githubToken }) => {
    try {
      const allEvents = await Promise.all([
        ...(await this.fetchGithubEvents(streamSettings.repos, githubToken))
        // ...(await this.fetchArenaEvents()),
        // ...(await this.fetchTrelloEvents()),
        // ...(await this.fetchSlackEvents(streamSettings.channels))
        // ...(await this.fetchDropboxEvents())
      ])
      this.database.events = this.sortEvents(allEvents)
      return true
    } catch (error) {
      throw new Error(error)
    }
  }

  sortEvents = events =>
    events.sort((eventA, eventB) =>
      dayjs(eventA.createdAt).isAfter(dayjs(eventB.createdAt)) ? -1 : 1
    )

  fetchGithubEvents = async repos => {
    const repoEvents = await Promise.all(
      repos.map(async repo => {
        try {
          const { data } = await axios.get(`${repo.endpoint}?per_page=500`)
          return data.map(event => {
            if (
              event.type === ISSUES_EVENT ||
              event.type === ISSUE_COMMENT_EVENT
            ) {
              const issue = event.payload.issue
              if (!this.database.issues[issue.id]) {
                this.database.issues[issue.id] = {
                  eventsUrl: issue.events_url,
                  createdAt: dayjs(event.created_at).format(DATE_FORMAT),
                  title: issue.title,
                  labels: issue.labels,
                  id: issue.id
                }
              }
            }
            if (!this.database.users[event.actor.id]) {
              this.database.users[event.actor.id] = {
                eventsUrl: `${event.actor.url}/events`,
                id: event.actor.id,
                user: event.actor.display_login
              }
            }
            this.database.types.add(event.type)
            return {
              app: GITHUB,
              createdAt: dayjs(event.created_at).format(DATE_FORMAT),
              data: event,
              type: event.type,
              user: event.actor.display_login
            }
          })
        } catch (error) {
          console.error(error)
          return []
        }
      })
    )

    return flatten2DArray(repoEvents)
  }

  fetchArenaEvents = async (page = '0') => {
    try {
      const {
        data: { contents }
      } = await axios.get(`${ARENA_ENDPOINT_STREAMS}?per=50`)
      return contents.map(event => ({
        app: ARENA,
        createdAt: dayjs(event.connected_at).format(DATE_FORMAT),
        data: event
      }))
    } catch (error) {
      throw new Error(error)
    }
  }

  fetchTrelloEvents = async () => {
    try {
      const { data } = await axios.get(
        `${TRELLO_ACTIONS_ENDPOINT}/?limit=560&key=${TRELLO_KEY}&token=${TRELLO_TOKEN}`
      )
      return data.map(event => ({
        app: TRELLO,
        createdAt: dayjs(event.date).format(DATE_FORMAT),
        data: event
      }))
    } catch (error) {
      throw new Error(error)
    }
  }

  fetchDropboxEvents = async () => {
    try {
      const {
        data: { events }
      } = await axios.post(
        DROPBOX_TEAM_LOG_EVENTS_ENDPOINT,
        {
          limit: 50,
          category: 'paper'
        },
        {
          headers: {
            Authorization: `Bearer ${DROPBOX_TOKEN}`
          }
        }
      )
      return events.map(event => ({
        app: DROPBOX,
        createdAt: dayjs(event.timestamp).format(DATE_FORMAT),
        data: { ...event, id: event.details.event_uuid }
      }))
    } catch (error) {
      throw new Error(error)
    }
  }

  fetchSlackEvents = async channels => {
    const channelEvents = await Promise.all(
      channels.map(async channel => {
        try {
          const {
            data: { messages }
          } = await axios.get(channel.endpoint)
          return messages.map(event => ({
            app: SLACK,
            createdAt: dayjs.unix(event.ts.split('.')[0]).format(DATE_FORMAT),
            data: { ...event, id: event.ts }
          }))
        } catch (error) {
          console.error(error)
          return []
        }
      })
    )

    return flatten2DArray(channelEvents)
  }
}

export default new MockStreamsServer()
