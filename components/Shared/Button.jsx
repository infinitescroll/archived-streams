import styled from 'styled-components'
import { color, space } from 'styled-system'

export default styled.button`
  ${space}
  ${color}
  font-size: ${props => props.theme.fontSizes[2]}px;
  background: ${props =>
    props.primary ? props.theme.colors.green : props.theme.colors.background};
  color: ${props =>
    props.primary ? props.theme.colors.text : props.theme.colors.text};
  padding: ${props => props.theme.space[2]}px ${props =>
  props.theme.space[3]}px;
  border: 1px solid
    ${props =>
      props.primary ? props.theme.colors.green : props.theme.colors.grey};
  border-radius: 100px;
  cursor: pointer;
  transition: 0.2s ease-in-out;

  &:hover {
    opacity: 0.8;
  }
`
