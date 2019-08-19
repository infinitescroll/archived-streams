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
  DATE_FORMAT
} from '../constants'
import { TRELLO_TOKEN, TRELLO_KEY, DROPBOX_TOKEN } from '../secrets'

import { flatten2DArray, groupify } from '../utils'

class MockStreamsServer {
  constructor() {
    this.database = {
      events: [],
      users: {},
      types: new Set([]),
      issues: {},
      pullRequests: []
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

  getPullRequests = () =>
    this.database.pullRequests.sort((prA, prB) =>
      dayjs(prA.updatedAt).isAfter(dayjs(prB.updatedAt)) ? -1 : 1
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
          const pulls = await axios.get(`${repo.endpoint}/pulls?per_page=500`)
          this.database.pullRequests = await Promise.all(
            pulls.data.map(
              async ({
                title,
                base: { label },
                id,
                number,
                labels,
                assignee,
                assignees,
                issue_url,
                body,
                user,
                state,
                updated_at,
                html_url
              }) => {
                const {
                  data: { comments }
                } = await axios.get(issue_url)
                if (!this.database.users[user.id]) {
                  this.database.users[user.id] = {
                    eventsUrl: user.events_url.replace('{/privacy}', ''),
                    id: user.id,
                    user: user.login
                  }
                }
                return {
                  title,
                  id,
                  number,
                  labels,
                  assignee,
                  assignees,
                  label,
                  comments,
                  body,
                  url: html_url,
                  user: user.login,
                  state,
                  updatedAt: dayjs(updated_at).format(DATE_FORMAT)
                }
              }
            )
          )

          const { data } = await axios.get(
            `${repo.endpoint}/events?per_page=500`
          )
          return data.map(event => {
            // mutates the database (bad practice)
            groupify(this.database, event)
            this.database.types.add(event.type)
            return {
              app: GITHUB,
              createdAt: dayjs(event.created_at).format(DATE_FORMAT),
              data: event,
              type: event.type,
              user: event.actor.display_login,
              id: event.id
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
