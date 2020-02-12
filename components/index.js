import styled from 'styled-components'
import {
  color,
  typography,
  border,
  layout,
  position,
  space,
  flexbox
} from 'styled-system'

export const Box = styled.div`
  box-sizing: border-box;
  min-width: 0;
  ${space}
  ${color}
  ${layout}
  ${flexbox}
  ${border}
  ${typography}
`

export const Menu = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  ${space}
  ${color}
  ${layout}
  ${border}
  ${flexbox}
`

export const MenuItem = styled.li`
  ${space}
  ${color}
  ${layout}
  ${flexbox}
`

export const Icon = styled.span`
  display: inline-block;
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
  ${layout}
`
export const Label = styled.h5`
  margin: 0;
  text-transform: uppercase;
  font-weight: 600;
  color: #444;
  ${color}
  ${typography}
  ${layout}
`
