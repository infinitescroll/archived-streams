import styled from 'styled-components'
import {
  color,
  typography,
  border,
  layout,
  space,
  flexbox
} from 'styled-system'

export default styled.input.attrs((...props) => ({
  border: '1px solid #999',
  borderRadius: '4px',
  px: 3,
  fontSize: 2,
  ...props
}))`
  ${space}
  ${color}
  ${layout}
  ${flexbox}
  ${border}
  ${typography}

  &:focus {
    outline: none;
  }
`
