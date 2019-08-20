import axios from 'axios'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

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

import {
  flatten2DArray,
  groupify,
  eventHappenedToday,
  eventHappenedYesterday,
  eventHappenedLastWeek,
  eventHappenedLastMonth
} from '../utils'

dayjs.extend(relativeTime)

class MockStreamsServer {
  constructor() {
    this.database = {
      events: [],
      users: {},
      types: new Set([]),
      issues: {},
      pullRequests: [],
      branches: {}
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

  getBranchGroups = () => this.database.branches

  fetchEvents = async (streamSettings, { githubToken }) => {
    try {
      const allEvents = await Promise.all([
        // TODO: this is only fetching the first repo (1 at a time)
        ...(await this.fetchGithubEvents(streamSettings.repos[0], githubToken))
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

  fetchGithubEvents = async repo => {
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

      const contributors = await axios.get(
        `${repo.endpoint}/stats/contributors`
      )

      contributors.data.forEach(({ author }) => {
        const { login, id, events_url } = author
        this.database.users[id] = {
          id,
          eventsUrl: events_url.replace('{/privacy}', ''),
          user: login
        }
      })

      const { data } = await axios.get(`${repo.endpoint}/events?per_page=500`)

      const events = {
        today: [],
        yesterday: [],
        lastWeek: [],
        lastMonth: [],
        catchAll: []
      }
      data.forEach(event => {
        // mutates the database (bad practice)
        groupify(this.database, event)
        this.database.types.add(event.type)

        const formattedEvent = {
          app: GITHUB,
          createdAt: dayjs(event.created_at).format(DATE_FORMAT),
          data: event,
          type: event.type,
          user: event.actor.display_login,
          id: event.id
        }

        const timeAgo = dayjs().to(dayjs(event.created_at))
        if (eventHappenedToday(timeAgo)) events.today.push(formattedEvent)
        else if (eventHappenedYesterday(timeAgo))
          events.yesterday.push(formattedEvent)
        else if (eventHappenedLastWeek(timeAgo))
          events.lastWeek.push(formattedEvent)
        else if (eventHappenedLastMonth(timeAgo))
          events.lastMonth.push(formattedEvent)
        else events.catchAll.push(formattedEvent)
      })
      return events
    } catch (error) {
      console.error(error)
      return []
    }
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
