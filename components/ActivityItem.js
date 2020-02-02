import styled from 'styled-components'
import { color, typography, border, layout, position, space, flexbox, grid } from 'styled-system'
import { Menu, MenuItem, Icon, Text } from '../components/index.js'



const ActivityRowContainer = styled(Menu)({
  space,
  color,
  layout,
  flexbox
})

const ActivityRowParent = styled(Menu)({
  space,
  color,
  layout,
  flexbox
})
const Author = styled(MenuItem)({
  space,
  color,
  layout,
  flexbox
})

export default (props) => (
  <ActivityRowContainer
  display={'flex'}
  px={2}
  py={1}
  backgroundColor={'#f5f5f5'}
  >
    <ActivityRowParent
    display={'flex'}
    justifyItems={'space-between'}
    backgroundColor={'#999'}
    >
      <Author>Author.img</Author>
      <Icon>App Icon</Icon>
      <Text>Action Type</Text>
    </ActivityRowParent>
    <ActivityRowParent
      display={'flex'}>
      <Author>Activity Message</Author>
      <Text>Time</Text>
    </ActivityRowParent>
  </ActivityRowContainer>
)
