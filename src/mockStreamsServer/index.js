import axios from 'axios'
import dayjs from 'dayjs'
import calendar from 'dayjs/plugin/calendar'
import parse from 'parse-link-header'

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

dayjs.extend(calendar)

class MockStreamsServer {
  constructor() {
    this.database = {
      events: [],
      users: {},
      types: new Set([]),
      issues: {},
      pullRequestObj: {},
      branches: {}
    }
  }

  getEvents = () => {
    return this.database.events
  }

  getResourcesTouchedDuringTimePeriod = timePeriod => {
    const issuesInTimePeriod = Object.keys(this.database.issues)
      .filter(
        issueId => this.database.issues[issueId].events[timePeriod].length > 0
      )
      .map(issueId => ({
        ...this.database.issues[issueId],
        events: this.database.issues[issueId].events[timePeriod]
      }))

    const pullRequestsInTimePeriod = Object.keys(this.database.pullRequestObj)
      .filter(
        pullId =>
          this.database.pullRequestObj[pullId].events[timePeriod].length > 0
      )
      .map(pullId => ({
        ...this.database.pullRequestObj[pullId],
        events: this.database.pullRequestObj[pullId].events[timePeriod]
      }))

    const branchesInTimePeriod = Object.keys(this.database.branches)
      .filter(
        branchName =>
          this.database.branches[branchName].events[timePeriod].length > 0
      )
      .map(branchName => ({
        ...this.database.branches[branchName],
        events: this.database.branches[branchName].events[timePeriod]
      }))

    return {
      resources: [
        ...issuesInTimePeriod,
        ...pullRequestsInTimePeriod,
        ...branchesInTimePeriod
      ]
    }
  }

  getUsers = () => this.database.users

  getTypes = () => [...this.database.types]

  getIssues = () => this.database.issues

  getPullRequests = () => this.database.pullRequestObj

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

  recursivelyFetchAllGithubEvents = async endpoint => {
    const recurse = async (events, parsedLink, count) => {
      if (count === 3) return events
      if (!parsedLink || !parsedLink.last) return events

      const {
        data,
        headers: { link }
      } = await axios.get(parsedLink.next.url)

      return recurse(events.concat(data), parse(link), count + 1)
    }
    const {
      data,
      headers: { link }
    } = await axios.get(`${endpoint}/events?per_page=100`)
    return recurse(data, parse(link), 0)
  }

  fetchGithubEvents = async repo => {
    const pulls = await axios.get(`${repo.endpoint}/pulls?state=all`)
    const pullRequests = await Promise.all(
      pulls.data.map(
        async ({
          title,
          created_at,
          head,
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
          return {
            title,
            created_at,
            head,
            base: { label },
            id,
            number,
            labels,
            assignee,
            assignees,
            label,
            body,
            url: html_url,
            user: user.login,
            state,
            updatedAt: dayjs(updated_at).format(DATE_FORMAT)
          }
        }
      )
    )

    pullRequests.forEach(pr => {
      pr.type = 'pullRequestObj'
      pr.events = {
        today: [],
        yesterday: [],
        lastWeek: [],
        lastMonth: [],
        catchAll: []
      }

      this.database.pullRequestObj[pr.id] = pr
    })

    const data = await this.recursivelyFetchAllGithubEvents(repo.endpoint)
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

      const calendarTime = dayjs(event.created_at).calendar(dayjs())
      if (eventHappenedToday(calendarTime)) events.today.push(formattedEvent)
      else if (eventHappenedYesterday(calendarTime))
        events.yesterday.push(formattedEvent)
      else if (eventHappenedLastWeek(calendarTime))
        events.lastWeek.push(formattedEvent)
      else if (eventHappenedLastMonth(calendarTime))
        events.lastMonth.push(formattedEvent)
      else events.catchAll.push(formattedEvent)
    })

    return events
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
