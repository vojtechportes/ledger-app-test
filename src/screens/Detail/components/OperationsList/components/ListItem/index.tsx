import * as React from "react";
import { View, Text } from "react-native";
import { format } from "date-fns";
import { formatValue } from "../../../../../../../lib/ledger/index";
import { ProfitIndicator } from "../../../../../../components/index";
import styled from "../../../../../../theme/index";

export const Wrapper: any = styled(View)`
  flex-direction: row;
  justify-content: space-between;
  align-items: stretch;
  padding-top: 10;
  padding-right: 20;
  padding-bottom: 10;
  padding-left: 20;
  background-color: ${({ theme }) => theme.colors.white};  
  border-bottom-width: 1;
  border-bottom-color: ${({ theme }) => theme.colors.gray4};  
  border-radius: 2;
`;

export const Left: any = styled(View)`
  flex-direction: row;
  justify-content: flex-start;
`;

const Date: any = styled(Text)`
  margin-left: 20;
`;

const Ammount: any = styled(Text)`
  font-weight: bold;
  ${({ theme, direction }: any) =>
    theme && direction === TYPES.IN
      ? `
    color: ${theme.colors.green};
  `
      : `
    color: ${theme.colors.gray1};
  `};
`;

enum TYPES {
  IN,
  OUT
}

interface IPropsData {
  address: string;
  date: Date;
  hash: string;
  id: string;
  magnitude: number;
  symbol: string;
  type: TYPES;
  value: number;
}

interface IProps {
  data: IPropsData;
}

const ListItem: React.SFC<IProps> = ({ data }) => (
  <Wrapper>
    <Left>
      <ProfitIndicator direction={data.type} />
      <Date>{format(data.date, "DD/MM/YYYY hh:mm")}</Date>
    </Left>
    <View>
      <Ammount>
        <Text ellipsizeMode="middle" numberOfLines={1}>
          {parseFloat(formatValue(data.value, data.magnitude)).toFixed(6)}
        </Text>{" "}
        {data.symbol}
      </Ammount>
    </View>
  </Wrapper>
);

export default ListItem;
