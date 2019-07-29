import styled from 'styled-components'
import { BACKGROUND_LIGHT } from '../themes'

export const Header = styled.div`
  background-color: ${BACKGROUND_LIGHT};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: calc(10px + 2vmin);
  color: white;
`

export const Title = styled.h1`
  color: #2659ff;
  font-size: 16pt;
  margin-bottom: 60px;
  font-family: 'system-ui', Helvetica Neue, sans-serif;
  font-weight: 900;
  letter-space: 0.5pt;
  font-size 1.5rem;
  justify-self: center;
`

export const Link = styled.a`
  color: #e85223;
  text-decoration: none;
  font-family: 'system-ui', Helvetica Neue, sans-serif;
  letter-spacing: 0.5pt;
  cursor: pointer;

  :hover {
    color: #2659ff;
  }
`

export const AlignItemsRow = styled.div`
  display: flex;
  flex-direction: row;
`

export const AlignItemsColumn = styled.div`
  display: flex;
  flex-direction: column;
`
