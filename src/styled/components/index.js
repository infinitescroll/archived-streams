import styled from 'styled-components'
import { BACKGROUND_LIGHT } from '../themes'

export const Header = styled.div`
  background-color: ${BACKGROUND_LIGHT};
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: calc(10px + 2vmin);
  color: white;
`

export const Title = styled.h1`
  color: #d677ed;
  font-size: 16pt;
  margin-bottom: 60px;
  font-family: 'Avenir';
`

export const AlignItemsRow = styled.div`
  display: flex;
  flex-direction: row;
`
