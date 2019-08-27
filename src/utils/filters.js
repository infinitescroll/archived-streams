export const filterEvents = filters => event => {
  // if the event was triggered by at least one application in the filter list
  // and came from at least one user in the user list
  // and is of a type from at least one type in the types list
  // include it
  // this is messy and needs to be cleaned up... major
  const eventTriggeredByFilteredApplication =
    filters.applications.length > 0
      ? filters.applications.some(
          appFilter => event.app.toLowerCase() === appFilter.toLowerCase()
        )
      : true
  const eventCameFromFilteredUser =
    filters.users.length > 0
      ? filters.users.some(
          userFilter => event.user.toLowerCase() === userFilter.toLowerCase()
        )
      : true

  const types = {
    Pulls: [
      'pullrequestevent',
      'pullrequestreviewevent',
      'pullrequestreviewcommentevent'
    ],
    Issues: ['issuesevent', 'issuecommentevent'],
    Branches: ['pushevent']
  }

  const eventIsOfSpecificType =
    filters.types.length > 0
      ? filters.types.some(
          typeFilter => types[typeFilter].indexOf(event.type.toLowerCase()) > -1
        )
      : true

  return (
    eventTriggeredByFilteredApplication &&
    eventCameFromFilteredUser &&
    eventIsOfSpecificType
  )
}

export const getListOfFiltersFromUrlBar = params => {
  return {
    appFilters: params.getAll('applications'),
    typeFilters: params.getAll('type'),
    userFilters: params.getAll('user')
  }
}
