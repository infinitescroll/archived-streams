import axios from 'axios'
import dayjs from 'dayjs'

import {
  ARENA_ENDPOINT_STREAMS,
  GITHUB_EVENTS_ENDPOINT,
  TRELLO_ACTIONS_ENDPOINT,
  SLACK_CHANNEL_HISTORY_ENDPOINT
} from './endpoints'
import { ARENA, GITHUB, SLACK, TRELLO, DATE_FORMAT } from '../constants'
import {
  TRELLO_TOKEN,
  TRELLO_KEY,
  SLACK_TOKEN,
  SLACK_CHANNEL_GENERAL
} from '../secrets'

class MockStreamsServer {
  constructor() {
    this.database = {
      events: []
    }
  }

  getEvents = () => {
    return this.database.events
  }

  fetchEvents = async () => {
    try {
      const allEvents = await Promise.all([
        ...(await this._fetchGithubEvents()),
        ...(await this._fetchArenaEvents()),
        ...(await this._fetchTrelloEvents()),
        ...(await this._fetchSlackEvents())
      ])
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

  _fetchGithubEvents = async (page = '0') => {
    try {
      const { data } = await axios.get(`${GITHUB_EVENTS_ENDPOINT}?per_page=50`)
      return data.map(event => ({
        app: GITHUB,
        createdAt: dayjs(event.created_at).format(DATE_FORMAT),
        data: event
      }))
    } catch (error) {
      throw new Error(error)
    }
  }

  _fetchArenaEvents = async (page = '0') => {
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

  _fetchTrelloEvents = async () => {
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

  _fetchDropboxEvents = async () => {}

  _fetchSlackEvents = async () => {
    try {
      const {
        data: { messages }
      } = await axios.get(
        `${SLACK_CHANNEL_HISTORY_ENDPOINT}?token=${SLACK_TOKEN}&channel=${SLACK_CHANNEL_GENERAL}&pretty=1&oldest=1563026112`
      )
      return messages.map(event => ({
        app: SLACK,
        createdAt: dayjs.unix(event.ts.split('.')[0]).format(DATE_FORMAT),
        data: event
      }))
    } catch (error) {
      throw new Error(error)
    }
  }
}

export default new MockStreamsServer()
