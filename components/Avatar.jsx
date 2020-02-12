import styled from 'styled-components'
import { space, color, layout, border } from 'styled-system'

const Avatar = styled.span`
  ${space}
  ${color}
  ${layout}
  ${border}

  background-image: ${props => props.imageURL};
  background-position: center center;
  background-size: cover;
`

export default ({ imageURL }) => (
  <Avatar
    display="inline-block"
    width={4}
    height={4}
    bg="gray"
    borderRadius={100}
    backgroundImage={imageURL}
  />
)
