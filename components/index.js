import styled from 'styled-components'
import { color, typography, border, layout, position, space, flexbox, grid } from 'styled-system'

export const Box = styled.div(
  {
    boxSizing: 'border-box',
    minWidth: 0,
  },
  space,
  color,
  layout,
  flexbox
)

export const Menu = styled.ul(
  {
    listStyle: 'none',
  },
  space,
  color,
  layout,
  flexbox
)

export const MenuItem = styled.li(
  {
    listStyle: 'none',
  },
  space,
  color,
  layout,
  flexbox
)
