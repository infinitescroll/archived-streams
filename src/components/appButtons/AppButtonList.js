import React from 'react'
import { useSelector } from 'react-redux'
import { AlignItemsRow } from '../../styled/components'
import AppButton from './AppButton'

const AppButtonList = () => {
  const apps = useSelector(({ user }) => user.apps)
  return (
    <AlignItemsRow>
      {Object.keys(apps).map(app => {
        return (
          <AppButton
            app={{
              appName: app,
              userHasAuthenticated: !!apps[app].accessToken
            }}
            key={app}
          />
        )
      })}
    </AlignItemsRow>
  )
}

export default AppButtonList
