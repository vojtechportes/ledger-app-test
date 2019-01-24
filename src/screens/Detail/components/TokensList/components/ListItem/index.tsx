import * as React from "react";
import { View, Text } from "react-native";
import styled from "../../../../../../theme/index";

export const Wrapper: any = styled(View)`
  flex-direction: row;
  justify-content: space-between;
  align-items: stretch;
  margin-top: -1;
  padding-top: 10;
  padding-right: 20;
  padding-bottom: 10;
  padding-left: 20;
  background-color: ${({ theme }) => theme.colors.gray5};
  border-color: ${({ theme }) => theme.colors.gray2};
  border-top-width: 1;
  border-right-width: 0;
  border-bottom-width: 1;
  border-left-width: 0;
  border-radius: 2;
`;

interface IProps {
  value: string;
}

const ListItem: React.SFC<IProps> = ({ value }) => (
  <Wrapper>
    <Text>{value}</Text>
  </Wrapper>
);

export default ListItem;
