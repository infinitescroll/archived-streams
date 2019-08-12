import styled, { createGlobalStyle } from 'styled-components'

import {
  BACKGROUND_LIGHT,
  OWL_PURPLE,
  OWL_TEAL,
  BR_CREAM,
  DARK_BLUE,
  BLUE,
  DARK_LILAC,
  BLUE_TRANSP
} from '../themes'

export const GlobalStyle = createGlobalStyle`
  html,body {
    background-color: ${BR_CREAM};
    margin: 0;
    padding: 0;
    height: 100%;
    width: 100%;
  }
`
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
  color: ${DARK_LILAC};
  font-family: Futura, Segoe UI, 'system-ui', sans-serif;
  font-size: 6rem;
  letter-spacing: 1rem;
  text-align: center;
  margin-top: 3rem;
  margin-bottom: 3rem;
  width: 70%;
  text-shadow: 0.75rem 0rem ${BLUE_TRANSP};
`

export const Link = styled.a`
  color: ${DARK_BLUE};
  text-decoration: none;
  letter-spacing: 0.5pt;
  cursor: pointer;

  &:hover {
    color: ${BLUE};
    text-decoration: underline;
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

export const SubmitButton = styled.button`
  background-color: ${BACKGROUND_LIGHT};
  color: #dfeaff;
  font-size: 1.5rem;
  border: 0.12rem solid #dfe3ff;
  border-radius: 2rem;
  width: 100%;
  max-width: 32rem;
  padding: 1rem;
  margin: 2rem;
  cursor: pointer;
`

export const TextField = styled.input`
  background-color: #dfe3ff;
  border: 0.12rem solid ${BACKGROUND_LIGHT};
  font-size: 1.5rem;
  border-radius: 2rem;
  width: 100%;
  max-width: 32rem;
  text-align: center;
  padding: 1rem;
  margin: 2rem;
`

export const CenterXY = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 40vh;
`

export const SignUpAlert = styled.div`
  text-align: center;
  background-color: ${BACKGROUND_LIGHT};
  color: ${OWL_TEAL};
  border: 0.12rem solid ${OWL_PURPLE};
  font-size: 1.5rem;
  border-radius: 2rem;
  font-family: sans-serif;
  padding: 1rem;
`
