import styled from 'styled-components'
import { Menu, MenuItem } from '.'
import Button from './Button'

const StreamMenu = styled(Menu)``

const StreamObject = styled(Menu)`
  border: 1px solid #999;
  border-radius: 100px;
`

const StreamObjectContent = styled(MenuItem)`
  display: inline;
  margin: 0.25rem;
`

export default () => (
  <StreamMenu display="block" py={2} pl={0}>
    <StreamObject
      display="inline-block"
      backgroundColor="#f5f5f5"
      px={3}
      py={2}
      mx={2}
    >
      <StreamObjectContent display="inline">stream.name</StreamObjectContent>
      <StreamObjectContent display="inline">Edit</StreamObjectContent>
    </StreamObject>
    <Button primary>New Stream</Button>
  </StreamMenu>
)
