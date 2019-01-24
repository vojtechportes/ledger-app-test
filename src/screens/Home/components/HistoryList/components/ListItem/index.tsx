import * as React from "react";
import { TouchableOpacity, View, Text } from "react-native";
import Delete from "../../../../../../components/Delete/index";
import styled from "../../../../../../theme/index";

const Wrapper: any = styled(View)`
  flex-direction: row;
  justify-content: space-between;
  align-items: stretch;
  margin-bottom: 10;
  padding-top: 10;
  padding-right: 20;
  padding-bottom: 10;
  padding-left: 20;  
  background-color: ${({ theme }) => theme.colors.gray4 };
  border-radius: 2;
`;

const Left: any = styled(TouchableOpacity)`
  flex-grow: 1;
  flex-shrink: 1;
  flex-basis: 1;
`;

const Right: any = styled(View)`
  flex-shrink: 0;
  flex-basis: 40;
  align-self: flex-end;
  padding-left: 20;
`;

interface IProps {
  address: string;
  id: string;
  onPress: (id: string) => void;
  onDelete: (id: string) => void;
}

const ListItem: React.SFC<IProps> = ({ id, address, onPress, onDelete }) => (
  <Wrapper>
    <Left onPress={onPress.bind(null, address)}>
      <Text ellipsizeMode="middle" numberOfLines={1}>
        {address}
      </Text>
    </Left>
    <Right>
      <Delete width={20} height={20} onPress={onDelete.bind(null, id)} />
    </Right>
  </Wrapper>
);

export default ListItem;