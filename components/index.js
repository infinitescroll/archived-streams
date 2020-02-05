import styled from 'styled-components'
import { color, typography, border, layout, position, space, flexbox, grid } from 'styled-system'

export const Box = styled.div`
  {
    list-style: 'border-box';
    list-style: 0;
  }
  ${space}
  ${color}
  ${layout}
  ${flexbox}
`

export const Menu = styled.ul`
  {
    list-style: none;
  }
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
`
