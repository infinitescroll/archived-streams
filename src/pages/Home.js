import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import styled from 'styled-components'
// import axios from 'axios'
import { OWL_LOGO } from '../assets'
import { Title, Header } from '../styled/components'
import {
  requestedStreamEvents,
  requestedStreamEventsSuccess,
  requestedStreamEventsError
} from '../store/actions'

const fakeAjaxReq = () =>
  new Promise(resolve => {
    setTimeout(() => {
      resolve(fakeData)
    }, 200)
  })

const Home = ({
  requestedStreamEvents,
  requestedStreamEventsSuccess,
  requestedStreamEventsError
}) => {
  useEffect(() => {
    document.body.classList.add('background-light')
    const requestStreams = async () => {
      requestedStreamEvents()
      try {
        requestedStreamEventsSuccess(await fakeAjaxReq())
      } catch (error) {
        requestedStreamEventsError(error)
      }
    }

    requestStreams()
  }, [
    requestedStreamEvents,
    requestedStreamEventsSuccess,
    requestedStreamEventsError
  ])

  return (
    <Header>
      <FrontEndCenter>
        <Title>Welcome to Streams!</Title>
        <img
          src={OWL_LOGO}
          style={{ height: '200px', width: 'auto' }}
          alt="logo"
        />
      </FrontEndCenter>
    </Header>
  )
}

Home.propTypes = {
  requestedStreamEvents: PropTypes.func.isRequired,
  requestedStreamEventsSuccess: PropTypes.func.isRequired,
  requestedStreamEventsError: PropTypes.func.isRequired
}

const mapStateToProps = ({ events }) => {
  return {
    events
  }
}

const mapDispatchToProps = {
  requestedStreamEvents,
  requestedStreamEventsSuccess,
  requestedStreamEventsError
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home)

const FrontEndCenter = styled.div`
  position: fixed;
  top: 18px;
`

/* until we get real data in */
export const fakeData = [
  {
    app: 'github',
    data: {
      id: '10015537639',
      type: 'PushEvent',
      actor: {
        id: 12353734,
        login: 'Schwartz10',
        display_login: 'Schwartz10',
        gravatar_id: '',
        url: 'https://api.github.com/users/Schwartz10',
        avatar_url: 'https://avatars.githubusercontent.com/u/12353734?'
      },
      repo: {
        id: 186679312,
        name: 'openworklabs/streams',
        url: 'https://api.github.com/repos/openworklabs/streams'
      },
      payload: {
        push_id: 3819129293,
        size: 1,
        distinct_size: 1,
        ref: 'refs/heads/primary',
        head: '0a7967f71efbff071c6c44e6cbc33fec7efc6cb6',
        before: 'e4448cf8b85b06e98a47320d0ed736e2fe9ab4ba',
        commits: [Array]
      },
      public: true,
      created_at: '2019-07-15T20:22:21Z',
      org: {
        id: 46582040,
        login: 'openworklabs',
        gravatar_id: '',
        url: 'https://api.github.com/orgs/openworklabs',
        avatar_url: 'https://avatars.githubusercontent.com/u/46582040?'
      }
    }
  },
  {
    app: 'github',
    data: {
      id: '10015438989',
      type: 'CreateEvent',
      actor: {
        id: 12353734,
        login: 'Schwartz10',
        display_login: 'Schwartz10',
        gravatar_id: '',
        url: 'https://api.github.com/users/Schwartz10',
        avatar_url: 'https://avatars.githubusercontent.com/u/12353734?'
      },
      repo: {
        id: 197064220,
        name: 'openworklabs/streams-server',
        url: 'https://api.github.com/repos/openworklabs/streams-server'
      },
      payload: {
        ref: 'primary',
        ref_type: 'branch',
        master_branch: 'primary',
        description: 'A streams server to manage webhooks ',
        pusher_type: 'user'
      },
      public: true,
      created_at: '2019-07-15T20:06:51Z',
      org: {
        id: 46582040,
        login: 'openworklabs',
        gravatar_id: '',
        url: 'https://api.github.com/orgs/openworklabs',
        avatar_url: 'https://avatars.githubusercontent.com/u/46582040?'
      }
    }
  },
  {
    app: 'github',
    data: {
      id: '10015423316',
      type: 'ForkEvent',
      actor: {
        id: 8434548,
        login: 'listenaddress',
        display_login: 'listenaddress',
        gravatar_id: '',
        url: 'https://api.github.com/users/listenaddress',
        avatar_url: 'https://avatars.githubusercontent.com/u/8434548?'
      },
      repo: {
        id: 186679312,
        name: 'openworklabs/streams',
        url: 'https://api.github.com/repos/openworklabs/streams'
      },
      payload: { forkee: [Object] },
      public: true,
      created_at: '2019-07-15T20:04:16Z',
      org: {
        id: 46582040,
        login: 'openworklabs',
        gravatar_id: '',
        url: 'https://api.github.com/orgs/openworklabs',
        avatar_url: 'https://avatars.githubusercontent.com/u/46582040?'
      }
    }
  },
  {
    app: 'trello',
    data: {
      id: '5939a82bcb0811201c349bf9',
      idMemberCreator: '5589c3ea49b40cedc28cf70e',
      data: {
        list: {
          name: 'Done',
          id: '58dba95aa3fca404ad62476c'
        },
        board: {
          shortLink: 'd2EnEWSY',
          name: 'Best Test Board!',
          id: '586e8f681d4fe9b06a928307'
        },
        card: {
          shortLink: 'HKaaH2Pk',
          idShort: 94,
          name: 'Design New System',
          id: '5939a829eba57d109331a289',
          pos: 229375
        },
        old: {
          pos: 163839.5
        }
      },
      type: 'updateCard',
      date: '2017-06-08T19:40:27.915Z',
      memberCreator: {
        id: '5589c3ea49b40cedc28cf70e',
        avatarHash: 'd24f1fe1d7da4b5aab5243ebd65af4a1',
        fullName: 'Bentley Cook',
        initials: 'BC',
        username: 'bentleycook'
      }
    }
  },
  {
    app: 'trello',
    data: {
      id: '5939a82bcb0811201c349bf8',
      idMemberCreator: '5589c3ea49b40cedc28cf70e',
      data: {
        listAfter: {
          name: 'Done',
          id: '58dba95aa3fca404ad62476c'
        },
        listBefore: {
          name: 'Doing',
          id: '58d4144e4ec5c792a898d4b4'
        },
        board: {
          shortLink: 'd2EnEWSY',
          name: 'Best Test Board!',
          id: '586e8f681d4fe9b06a928307'
        },
        card: {
          shortLink: 'HKaaH2Pk',
          idShort: 94,
          name: 'Design New System',
          id: '5939a829eba57d109331a289',
          idList: '58dba95aa3fca404ad62476c'
        },
        old: {
          idList: '58d4144e4ec5c792a898d4b4'
        }
      },
      type: 'updateCard',
      date: '2017-06-08T19:40:27.878Z',
      memberCreator: {
        id: '5589c3ea49b40cedc28cf70e',
        avatarHash: 'd24f1fe1d7da4b5aab5243ebd65af4a1',
        fullName: 'Bentley Cook',
        initials: 'BC',
        username: 'bentleycook'
      }
    }
  }
]
