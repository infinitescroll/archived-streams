const mockApiUserRequest = () =>
  new Promise(resolve => {
    setTimeout(() => {
      resolve({
        data: {
          user: {
            email: 'zach@shrmn.toys',
            github: {
              profile: {
                username: 'radio-alice'
              },
              username: 'radio-alice',
              accessToken: 'xxxxxxx',
              refreshToken: 'yyyyyyyy'
            }
          }
        }
      })
    }, 1000)
  })

export default mockApiUserRequest
