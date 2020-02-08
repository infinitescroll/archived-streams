import React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { Box } from '../components'
import StreamMenu from '../components/StreamMenu'
import ActivityItem from '../components/ActivityItem'
import StreamEditor from '../components/StreamEditor'

const ActivityWrapper = styled(Box)({})

const Index = () => (
  <Box display="block" minHeight="100vh" p={3}>
    <StreamMenu />
    <ActivityWrapper>
      <StreamEditor />
      <ActivityItem />
    </ActivityWrapper>
  </Box>
)

export default connect()(Index)
