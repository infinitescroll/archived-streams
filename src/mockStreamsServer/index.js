import axios from 'axios'
import dayjs from 'dayjs'

import {
  ARENA_ENDPOINT_STREAMS,
  TRELLO_ACTIONS_ENDPOINT,
  SLACK_CHANNEL_HISTORY_ENDPOINT,
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

import { flatten2DArray } from '../utils'

class MockStreamsServer {
  constructor() {
    this.database = {
      events: []
    }
  }

  getEvents = () => {
    return this.database.events
  }

  fetchEvents = async (streamSettings, user) => {
    try {
      const allEvents = await Promise.all([
        ...(await this.fetchGithubEvents(streamSettings.repos)),
        // ...(await this.fetchArenaEvents()),
        // ...(await this.fetchTrelloEvents()),
        ...(await this.fetchSlackEvents(streamSettings.channels, user))
        // ...(await this.fetchDropboxEvents())
      ])
      console.log(allEvents)
      this.database.events = this._sortEvents(allEvents)
      return true
    } catch (error) {
      throw new Error(error)
    }
  }

  _sortEvents = events =>
    events.sort((eventA, eventB) =>
      dayjs(eventA.createdAt).isAfter(dayjs(eventB.createdAt)) ? -1 : 1
    )

  fetchGithubEvents = async repos => {
    const repoEvents = await Promise.all(
      repos.map(async repo => {
        try {
          const { data } = await axios.get(`${repo.endpoint}?per_page=50`)
          return data.map(event => ({
            app: GITHUB,
            createdAt: dayjs(event.created_at).format(DATE_FORMAT),
            data: event
          }))
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

  fetchSlackEvents = async (channels, user) => {
    const channelEvents = await Promise.all(
      channels.map(async channel => {
        try {
          const {
            data: { messages }
          } = await axios.get(
            `${SLACK_CHANNEL_HISTORY_ENDPOINT}?token=${user.apps[SLACK].accessToken}&channel=${channel.id}&pretty=1&oldest=1563026112`
          )
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
