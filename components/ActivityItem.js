import styled from 'styled-components'
import { color, typography, border, layout, position, space, flexbox, grid } from 'styled-system'
import { Menu, MenuItem, Icon, Text } from '../components/index.js'



const ActivityRowContainer = styled(Menu)`
  ${space}
  ${color}
  ${layout}
  ${flexbox}
`
const ActivityRowParent = styled(Menu)`
  {
    li {
      margin: 0rem 1rem;
    }
  }
  ${space}
  ${color}
  ${layout}
  ${flexbox}
`
const Author = styled(MenuItem)`
  ${space}
  ${color}
  ${layout}
  ${flexbox}
`

const Action = styled(MenuItem)`
  ${space}
  ${color}
  ${layout}
  ${flexbox}
`

const ActivitySource = styled(MenuItem)`
  ${space}
  ${color}
  ${layout}
  ${flexbox}
`

const Message = styled(MenuItem)`
  text-overflow: ellipsis;
  word-wrap: nowrap;
  overflow: hidden;

  ${space}
  ${color}
  ${layout}
  ${flexbox}
`

const Time = styled(MenuItem)`
  ${space}
  ${color}
  ${layout}
  ${flexbox}
`

export default (props) => (
  <ActivityRowContainer
  display={'flex'}
  justifyContent={'space-between'}
  px={2}
  py={1}
  backgroundColor={'#f5f5f5'}
  >
    <ActivityRowParent
    display={'flex'}
    justifyItems={'space-between'}
    alignItems={'center'}
    backgroundColor={'#999'}
    p={3}
    >
      <Author>Author.img</Author>
      <Icon>App Icon</Icon>
      <Action>Action Type</Action>
    </ActivityRowParent>
    <ActivityRowParent
      display={'flex'}
      flex={'1'}
      justifyContent={'flex-start'}
      alignItems={'center'}
      pl={0}
      >
      <ActivitySource>Repo/Branch</ActivitySource>
      <Message
      flex={1}
      >Activity Message</Message>
      <Time>Time</Time>
    </ActivityRowParent>
  </ActivityRowContainer>
)
