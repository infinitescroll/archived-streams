import mockStreamServer from '../mockStreamsServer'

const groupByUser = events => {
  let users = mockStreamServer.getUsers()
  return users.map(user =>
    events.filter(event => event.user.toLowerCase() === user.toLowerCase())
  )
}

export const groupBy = (type, events) => {
  switch (type) {
    case 'user':
      return groupByUser(events)
    // case 'type':
    //   return groupByType
    // case 'time':
    //   return groupByTime
  }
}
