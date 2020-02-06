import styled from "styled-components";
import {
  color,
  typography,
  border,
  layout,
  position,
  space,
  flexbox,
  grid
} from "styled-system";
import { Menu, MenuItem, Icon, Text } from "../components/index.js";
import {
  IcoGitHub,
  IcoGitHubCommit,
  IcoGitHubMerge,
  IcoGitHubCompare,
  IcoGitHubPullRequest,
  IcoGitHubBranch
} from "../components/icons.js";

const ActivityRowContainer = styled(Menu)`
  li {
    margin: 0rem 1rem;
  }
  ${space}
  ${color}
  ${layout}
  ${flexbox}
  ${border}
`;
const ActivityRowParent = styled(Menu)`
  span {
    margin: 0rem 0.25rem;
  },
  ${space}
  ${color}
  ${layout}
  ${flexbox}
  ${border}
`;
const Author = styled(MenuItem)`
  ${space}
  ${color}
  ${layout}
  ${border}
`;

const AppIcon = styled(Icon)`
  ${border}
`;

const ActionIcon = styled(Icon)`
  ${border}
`;

const Action = styled(MenuItem)`
  ${space}
  ${color}
  ${layout}
  ${flexbox}
`;

const ActivitySource = styled(MenuItem)`
  ${space}
  ${color}
  ${layout}
  ${flexbox}
`;

const Message = styled(MenuItem)`
  text-overflow: ellipsis;
  word-wrap: nowrap;
  overflow: hidden;
  ${space}
  ${color}
  ${layout}
  ${flexbox}
`;

const Time = styled(MenuItem)`
  ${space}
  ${color}
  ${layout}
  ${flexbox}
`;

export default props => (
  <ActivityRowContainer
    display={"flex"}
    justifyContent={"space-between"}
    alignItems={"center"}
    p={2}
    backgroundColor={"#f5f5f5"}
    borderRadius={"4px"}
  >
    <Author
      display={"inline-block"}
      width={"32px"}
      height={"32px"}
      backgroundColor={"#000"}
      borderRadius={"100px"}
    ></Author>
    <ActivityRowParent
      display={"flex"}
      justifyContent={"space-between"}
      alignItems={"center"}
      backgroundColor={"#ccc"}
      p={1}
      borderRadius={"100px"}
    >
      <AppIcon
        display={"inline-block"}
        width={"32px"}
        height={"32px"}
        borderRadius={"100px"}
      >
        <IcoGitHub />
      </AppIcon>
      <ActionIcon
        display={"inline-block"}
        width={"32px"}
        height={"32px"}
        backgroundColor={"#dbdbdb"}
        borderRadius={"100px"}
      >
        <IcoGitHubCommit />
      </ActionIcon>
      <Action>Commit</Action>
    </ActivityRowParent>
    <ActivityRowParent
      display={"flex"}
      flex={"1"}
      justifyContent={"flex-start"}
      alignItems={"center"}
      pl={0}
    >
      <ActivitySource>Repo/Branch</ActivitySource>
      <Message flex={1}>Activity Message</Message>
      <Time>Time</Time>
    </ActivityRowParent>
  </ActivityRowContainer>
);
