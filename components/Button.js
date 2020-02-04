import styled from "styled-components";

export const Button = styled.button`
  font-size: ${props => props.theme.fontSizes[2]}px;
  background: ${props =>
    props.primary ? props.theme.colors.green : props.theme.colors.background};
  color: ${props =>
    props.primary ? props.theme.colors.text : props.theme.colors.text};
  padding: ${props => props.theme.space[2]}px ${props => props.theme.space[3]}px;
  border: 1px solid
    ${props =>
      props.primary ? props.theme.colors.green : props.theme.colors.grey};
  border-radius: 100px;
`;

export const ButtonPrimary = () => <Button primary />;
