import styled from 'styled-components'
import {
  color,
  typography,
  border,
  layout,
  space,
  flexbox
} from 'styled-system'

export default styled.div`
  box-sizing: border-box;
  min-width: 0;
  ${space}
  ${color}
  ${layout}
  ${flexbox}
  ${border}
  ${typography}
`
