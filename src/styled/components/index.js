import styled from 'styled-components'
import { BACKGROUND_LIGHT, OWL_PURPLE, OWL_TEAL } from '../themes'

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
  color: ${OWL_PURPLE};
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
