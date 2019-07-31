export const authHeader = jwt => {
  return {
    headers: {
      Authorization: `Bearer ${jwt}`
    }
  }
}
