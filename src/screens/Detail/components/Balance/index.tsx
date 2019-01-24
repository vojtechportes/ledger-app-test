import * as React from "react";
import { Text, View } from "react-native";
import { Heading } from "../../../../components/index";
import { formatValue } from "../../../../../lib/ledger/index";
import styled from "../../../../theme/index";

export const Wrapper: any = styled(View)`
  justify-content: center;
  align-items: center;
  margin-right: 20;
  margin-left: 20;
  padding-top: 20;
  padding-bottom: 30;
  border-bottom-width: 1;
  border-bottom-color: ${({ theme }) => theme.colors.gray3};
`;

interface IProps {
  token: {
    value: number;
    symbol: string;
    magnitude: number;
  };
  rate: {
    value: number;
    symbol: string;
  };
}

const Balance: React.SFC<IProps> = ({ token, rate }) => {
  const formatedValue = parseFloat(formatValue(token.value, token.magnitude));
  const valueInUSDT = formatedValue * rate.value;

  return (
    <Wrapper>
      <Heading size="large" align="center" marginBottom={1}>
        {formatedValue.toFixed(6)} {token.symbol}
      </Heading>
      <Text>{valueInUSDT.toFixed(2)} USD</Text>
    </Wrapper>
  );
};

export default Balance;
