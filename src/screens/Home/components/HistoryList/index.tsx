import * as React from "react";
import { FlatList } from "react-native";
import ListItem from "./components/ListItem/index";
import styled from "../../../../theme/index";

const StyledFlatList: any = styled(FlatList)`
  margin-bottom: 20;
`;

export interface IPropsData {
  id: string;
  address: string;
}

interface IProps {
  data: IPropsData[];
  onPress: (id: string) => void;
  onDelete: (id: string) => void;
}

const HistoryList: React.SFC<IProps> = ({ data, onPress, onDelete }) => (
  <StyledFlatList
    data={data}
    // tslint:disable-next-line jsx-no-lambda
    keyExtractor={(item: any) => item.id}
    // tslint:disable-next-line jsx-no-lambda
    renderItem={({ item }: any) => (
      <ListItem
        onPress={onPress}
        onDelete={onDelete}
        address={item.address}
        id={item.id}
      />
    )}
  />
);

export default HistoryList;
