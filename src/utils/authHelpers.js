export const authHeader = jwt => {
  return {
    headers: {
      Authorization: `Bearer ${jwt}`
    }
  }
}

export const generateAuthQueryParams = (queryParam, value) => {
  return `${queryParam}=${value}`
}
