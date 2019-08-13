export const filterEvents = filters => event => {
  console.log(filters)
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
  const eventIsOfSpecificType =
    filters.types.length > 0
      ? filters.types.some(
          typeFilter => event.type.toLowerCase() === typeFilter.toLowerCase()
        )
      : true

  return (
    eventTriggeredByFilteredApplication &&
    eventCameFromFilteredUser &&
    eventIsOfSpecificType
  )
}

export const getListOfFiltersFromUrlBar = params => {
  let appFilters = params.get('applications')
  let userFilters = params.get('users')
  let typeFilters = params.get('types')

  return {
    appFilters: appFilters ? appFilters.split(' ') : [],
    typeFilters: typeFilters ? typeFilters.split(' ') : [],
    userFilters: userFilters ? userFilters.split(' ') : []
  }
}

export const addSearchParam = (filterListFromUrlBar, newFilter, param) => {
  return `${param}=${[...filterListFromUrlBar, newFilter].join('+')}`
}

export const removeSearchParam = (
  filterListFromUrlBar,
  filterToRemove,
  param
) => {
  const newFilterList = filterListFromUrlBar.filter(
    filter => !(filter === filterToRemove)
  )
  if (newFilterList.length === 0) return `${param}=null`
  return `${param}=${[...newFilterList].join('+')}`
}
