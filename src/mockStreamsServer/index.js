import axios from 'axios'
import dayjs from 'dayjs'

import { ARENA_ENDPOINT_STREAMS, GITHUB_EVENTS_ENDPOINT } from './endpoints'
import { ARENA, GITHUB } from '../constants'

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
        ...(await this._fetchArenaEvents())
      ])
      this.database.events = this._sortEvents(allEvents)
      return true
    } catch (error) {
      console.error(error)
      return false
    }
  }

  _sortEvents = events =>
    events.sort((eventA, eventB) =>
      dayjs(eventA.createdAt).isBefore(dayjs(eventB.createdAt)) ? -1 : 1
    )

  _fetchGithubEvents = async (page = '0') => {
    try {
      const { data } = await axios.get(`${GITHUB_EVENTS_ENDPOINT}?per_page=50`)
      return data.map(event => ({
        app: GITHUB,
        createdAt: event.created_at,
        data: event
      }))
    } catch (error) {
      console.error(error)
    }
  }

  _fetchArenaEvents = async (page = '0') => {
    try {
      const {
        data: { contents }
      } = await axios.get(`${ARENA_ENDPOINT_STREAMS}?per=50`)
      return contents.map(event => ({
        app: ARENA,
        createdAt: event.connected_at,
        data: event
      }))
    } catch (error) {
      console.error(error)
    }
  }

  _fetchTrelloEvents = async () => {}

  _fetchDropboxEvents = async () => {}

  _fetchSlackEvents = async () => {}
}

export default new MockStreamsServer()
