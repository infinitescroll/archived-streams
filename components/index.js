import styled from 'styled-components'
import {
  color,
  typography,
  border,
  layout,
  position,
  space,
  flexbox,
  grid
} from 'styled-system'

export const Box = styled.div(
  {
    listStyle: 'border-box'
  },
  space,
  color,
  layout,
  flexbox,
  border
)

export const Menu = styled.ul(
  {
    listStyle: 'none'
  },
  space,
  color,
  layout,
  flexbox
)

export const MenuItem = styled.li`
  ${space}
  ${color}
  ${layout}
  ${flexbox}
`

export const Icon = styled.span`
  ${space}
  ${color}
  ${layout}
  ${flexbox}
  ${border}
`

export const Input = styled.input`
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

export const Text = styled.p`
  ${color}
  ${typography}
`
