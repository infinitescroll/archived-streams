import React from 'react'
import { useSelector } from 'react-redux'
import { SLACK } from '../../constants'
import Selection from './Selection'
import { SLACK_CHANNEL_HISTORY_ENDPOINT } from '../../mockStreamsServer/endpoints'

export default () => {
  const { accessToken, channels } = useSelector(({ user }) => ({
    accessToken: user.apps[SLACK].accessToken,
    channels: user.apps[SLACK].channels || []
  }))

  return (
    <div>
      <h3>Select which Slack channels to add to this stream</h3>
      {channels.map(channel => {
        return (
          <Selection
            name={channel.name}
            type="channels"
            key={channel.id}
            endpoint={`${SLACK_CHANNEL_HISTORY_ENDPOINT}?token=${accessToken}&channel=${channel.id}&pretty=1`}
          />
        )
      })}
    </div>
  )
}
