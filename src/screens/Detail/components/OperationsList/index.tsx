import * as React from "react";
import { FlatList, ActivityIndicator, Button } from "react-native";
import ListItem from "./components/ListItem/index";
import { colors } from "../../../../theme/index";

enum SCROLL_DIRECTIONS {
  UP,
  DOWN,
  INITIAL
}

interface IProps {
  data: any;
  onEndReached: () => void;
  ListHeaderComponent: any;
}

interface IState {
  scrollDirection: SCROLL_DIRECTIONS;
  buttonEnabled: boolean;
}

class OperationsList extends React.PureComponent<IProps, IState> {
  public state = {
    scrollDirection: SCROLL_DIRECTIONS.INITIAL,
    buttonEnabled: true
  };

  private flatListRef = React.createRef<FlatList<{}>>();

  private scrollOffset = 0;

  public render() {
    const { data, onEndReached, ListHeaderComponent } = this.props;
    const { scrollDirection, buttonEnabled } = this.state;

    return (
      <>
        <FlatList
          ref={this.flatListRef}
          onScroll={this.handleScroll}
          data={data}
          // tslint:disable-next-line jsx-no-lambda
          keyExtractor={(item: any, index: any) => index.toString()}
          // tslint:disable-next-line jsx-no-lambda
          renderItem={({ item }: any) => <ListItem data={item} />}
          onEndReached={onEndReached}
          removeClippedSubviews={true}
          ListHeaderComponent={ListHeaderComponent}
          // tslint:disable-next-line jsx-no-lambda
          ListFooterComponent={() => {
            return <ActivityIndicator size={30} color={colors.gray2} />;
          }}
        />
        {scrollDirection === SCROLL_DIRECTIONS.UP && buttonEnabled && (
          <Button
            title="Scroll top"
            onPress={this.scrollTop}
            color={colors.blue}
          />
        )}
      </>
    );
  }

  private handleScroll = (e: any) => {
    console.log(e);
    const currentOffset = e.nativeEvent.contentOffset.y;
    const scrollDirection =
      currentOffset > this.scrollOffset
        ? SCROLL_DIRECTIONS.DOWN
        : SCROLL_DIRECTIONS.UP;
    this.scrollOffset = currentOffset;
    let buttonEnabled = this.state.buttonEnabled;
    
    if (!buttonEnabled && scrollDirection === SCROLL_DIRECTIONS.DOWN) {
      buttonEnabled = true
    }

    this.setState({ scrollDirection, buttonEnabled });
  };

  private scrollTop = () => {
    if (this.flatListRef.current) {
      this.flatListRef.current.scrollToOffset({ x: 0, y: 0, animated: true });
      this.setState({ scrollDirection: SCROLL_DIRECTIONS.INITIAL, buttonEnabled: false });
    }
  };
}

export default OperationsList;
