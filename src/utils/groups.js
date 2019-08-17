export const getGroupFromUrlBar = params => {
  return params.get('groupby') || ''
}
