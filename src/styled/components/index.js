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
  font-weight: 200;
  letter-space: 0.5pt;
  font-size 1.25rem
`

export const Link = styled.a`
  color: #e85223;
  text-decoration: none;
  font-size: 12pt;
  font-family: 'Avenir';
  letter-spacing: 0.5pt;
  cursor: pointer;
`

export const AlignItemsRow = styled.div`
  display: flex;
  flex-direction: row;
`

export const AlignItemsColumn = styled.div`
  display: flex;
  flex-direction: column;
`

export const SubmitButton = styled.button`
  background-color: BACKGROUND_LIGHT;
  color: #270e8f;
  border: 0.25rem solid #270e8f;
  border-radius: 4px;
  max-width: 16rem;
`
