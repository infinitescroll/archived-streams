import styled from 'styled-components'
import {
  color,
  typography,
  border,
  layout,
  space,
  flexbox
} from 'styled-system'

export { default as Box } from './Box'
export { default as Button } from './Button'
export { default as Input } from './Input'

export const Menu = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  ${space}
  ${color}
  ${layout}
  ${flexbox}
`

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

export const Text = styled.p`
  ${color}
  ${typography}
  ${layout}
`
