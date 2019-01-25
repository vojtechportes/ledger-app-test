import * as React from "react";
import { FlatList, Button } from "react-native";
import ListItem from "./components/ListItem/index";
import { formatValue } from "../../../../../lib/ledger/index";
import styled, { css, colors } from "../../../../theme/index";

export const StyledListCss: any = css`
  margin-bottom: 10;
  border-color: ${({ theme }) => theme.colors.gray2};
  border-top-width: 1;
  border-right-width: 1;
  border-bottom-width: 1;
  border-left-width: 1;
  border-radius: 3;
`;

const StyledList: any = styled(FlatList)`
  ${StyledListCss};
`;

// tslint:disable-next-line no-empty
const noop = () => {};

interface IProps {
  data: any;
  onShowAll?: () => void;
  showAll?: boolean;
}

class TokensList extends React.PureComponent<IProps> {
  public static defaultProps = {
    showAll: false,
    onShowAll: noop
  };
  
  public render() {
    const { data, showAll, onShowAll } = this.props;

    let processedData = Object.keys(data).map((key: string) => {
      const { value, symbol, magnitude } = data[key];
      const formatedValue = formatValue(value, magnitude);
      return `${formatedValue} ${symbol}`;
    });

    if (!showAll) {
      processedData = processedData.slice(0, 3);
    }

    const processedDataLength = processedData.length;

    return (
      <>
        <StyledList
          data={processedData}
          // tslint:disable-next-line jsx-no-lambda
          keyExtractor={(item: any, index: any) => index.toString()}
          // tslint:disable-next-line jsx-no-lambda
          renderItem={({ item, index }: any) => <ListItem value={item} isLast={processedDataLength === index +1} />}
        />
        {!showAll && (
          <Button
            title="Show all tokens"
            onPress={onShowAll}
            color={colors.blue}
          />
        )}
      </>
    );
  }
}

export default TokensList;
