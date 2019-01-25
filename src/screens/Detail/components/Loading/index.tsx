import * as React from "react";
import { View, Button } from "react-native";
import { Loading as LoadingItem, Heading } from "../../../../components/index";
import { Wrapper as BalanceWrapper } from "../Balance/index";
import { Top, TokensWrapper } from "../../index";
import {
  Left as ItemBottomLeft,
  Wrapper as ItemBottomWrapper
} from "../OperationsList/components/ListItem/index";
import { Wrapper as ItemTopWrapper } from "../TokensList/components/ListItem/index";
import { StyledListCss } from "../TokensList/index";
import styled from "../../../../theme/index";

const StyledList: any = styled(View)`
  ${StyledListCss};
`;

// tslint:disable-next-line no-empty
const noop = () => {};

const LoadingItemTop: React.SFC<{ isLast?: boolean }> = ({ isLast }) => (
  <ItemTopWrapper isLast={isLast}>
    <LoadingItem height={16} />
  </ItemTopWrapper>
);

LoadingItemTop.defaultProps = {
  isLast: false
};

const LoadingGroupTop = () => (
  <>
    <StyledList>
      <LoadingItemTop />
      <LoadingItemTop />
      <LoadingItemTop isLast={true} />
    </StyledList>
    <Button title="Show all tokens" disabled={true} onPress={noop} />
  </>
);

const LoadingItemBottom = () => (
  <ItemBottomWrapper>
    <ItemBottomLeft>
      <LoadingItem width={140} height={16} />
    </ItemBottomLeft>
    <View>
      <LoadingItem width={90} height={16} />
    </View>
  </ItemBottomWrapper>
);

const LoadingGroupBottom = () => (
  <>
    <LoadingItemBottom />
    <LoadingItemBottom />
    <LoadingItemBottom />
    <LoadingItemBottom />
    <LoadingItemBottom />
  </>
);

export const Loading = () => (
  <View>
    <BalanceWrapper>
      <LoadingItem width={220} height={34} marginBottom={10} />
      <LoadingItem width={110} height={16} />
    </BalanceWrapper>
    <Top>
      <TokensWrapper>
        <Heading color="gray3">Tokens</Heading>
        <LoadingGroupTop />
      </TokensWrapper>
      <Heading color="gray3">Operations</Heading>
    </Top>
    <LoadingGroupBottom />
  </View>
);
