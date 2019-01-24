import * as React from "react";
import { View } from "react-native";
import { NavigationScreenProps as IProps } from "react-navigation";
import { Main, Heading, ErrorText } from "../../components/index";
import { Loading } from "./components/Loading/index";
import Balance from "./components/Balance/index";
import OperationsList from "./components/OperationsList/index";
import TokensList from "./components/TokensList/index";
import TokensModal from "./components/TokensModal/index";
import styled from "../../theme/index";
import {
  fetchTxs,
  txsToOperations,
  getTokensSummary,
  getUSDTRate
} from "../../../lib/ledger/index.js";

export const Top: any = styled(View)`
  padding-top: 20;
  padding-right: 20;
  padding-left: 20;
`;

export const TokensWrapper: any = styled(View)`
  margin-bottom: 20;
`;

interface IState {
  loading: boolean;
  error: boolean;
  transactions: any[];
  operations: any[];
  operationsList: any[];
  tokens: any;
  totalOperations: number;
  canLoadMore: boolean;
  rates: any;
  isTokensModalVisible: boolean;
}

export default class Detail extends React.PureComponent<IProps, IState> {
  public static navigationOptions = ({ navigation }: IProps) => ({
    title: `Detail (${navigation.getParam("address")})`
  });

  constructor(props: any) {
    super(props);

    this.fetchData();

    this.state = {
      loading: true,
      error: false,
      transactions: [],
      operations: [],
      operationsList: [],
      tokens: {},
      totalOperations: 0,
      canLoadMore: false,
      rates: [],
      isTokensModalVisible: false
    };
  }

  public render() {
    const {
      loading,
      error,
      operationsList,
      tokens,
      rates,
      isTokensModalVisible
    } = this.state;

    if (error) {
      return (
        <Main>
          <Heading size="small" align="center">
            <ErrorText>Error :(</ErrorText>
          </Heading>
        </Main>
      );
    }

    if (loading) {
      return (
        <Main>
          <Loading />
        </Main>
      );
    }

    return (
      <Main>
        <TokensModal
          isVisible={isTokensModalVisible}
          onClose={this.handleToggleTokensModal}
        >
          <TokensList data={tokens} showAll={true} />
        </TokensModal>
        <Balance token={tokens.ETH} rate={rates.ETH} />
        <OperationsList
          data={operationsList}
          onEndReached={this.handleLoadMore}
          // tslint:disable-next-line jsx-no-lambda
          ListHeaderComponent={() => {
            return (
              <Top>
                <TokensWrapper>
                  <Heading>Tokens</Heading>
                  <TokensList
                    data={tokens}
                    onShowAll={this.handleToggleTokensModal}
                  />
                </TokensWrapper>
                <Heading>Operations</Heading>
              </Top>
            );
          }}
        />
      </Main>
    );
  }

  private fetchData = () => {
    const address = this.props.navigation.getParam("address");

    fetchTxs(address)
      .then(async (data: any) => {
        const transactions = data;
        const operations = txsToOperations(transactions, address);
        const totalOperations = operations.length;
        const tokens = getTokensSummary(operations);
        const rates = {};

        for await (const symbol of Object.keys(tokens)) {
          const value = await getUSDTRate(symbol);
          rates[symbol] = { symbol, value };
        }

        this.setState(
          {
            ...this.state,
            loading: false,
            transactions,
            operations,
            totalOperations,
            tokens,
            rates
          },
          () => {
            this.getOperations();
          }
        );
      })
      .catch(() => {
        this.setState({ loading: false, error: true });
      });
  };

  private getOperations = (offset: number = 0, limit: number = 20) => {
    const items = this.state.operations.slice(offset, offset + limit);
    const nextListTotal = this.state.operationsList.length + offset;

    if (this.state.totalOperations > nextListTotal) {
      this.setState({
        ...this.state,
        canLoadMore: true,
        operationsList: [...this.state.operationsList, ...items]
      });
    } else {
      this.setState({ ...this.state, canLoadMore: false });
    }
  };

  private handleLoadMore = () => {
    if (this.state.canLoadMore) {
      const offset = this.state.operationsList.length;
      this.getOperations(offset);
    }
  };

  private handleToggleTokensModal = () => {
    this.setState({
      ...this.state,
      isTokensModalVisible: !this.state.isTokensModalVisible
    });
  };
}
