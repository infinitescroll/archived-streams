import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'

import { retrievedGithubRepos } from '../store/actions'
import { GITHUB_REPOS_ENDPOINT } from '../constants'

export default () => {
  const dispatch = useDispatch()
  const { githubToken, loadedUser } = useSelector(({ user }) => ({
    loadedUser: user.loaded,
    githubToken: user.apps.github.accessToken,
    reposUrl: user.apps.github.reposUrl
  }))

  useEffect(() => {
    const retrieveRepos = async () => {
      try {
        const { data } = await axios.get(GITHUB_REPOS_ENDPOINT, {
          params: {
            sort: 'updated'
          },
          headers: {
            Authorization: `token ${githubToken}`
          }
        })
        dispatch(retrievedGithubRepos(data))
      } catch (err) {
        throw new Error(err)
      }
    }

    if (loadedUser) {
      retrieveRepos(GITHUB_REPOS_ENDPOINT)
    }
  }, [dispatch, githubToken, loadedUser])
}
