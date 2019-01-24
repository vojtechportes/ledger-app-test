import * as React from "react";
import { View, Button, Alert } from "react-native";
import { NavigationScreenProps } from "react-navigation";
import {
  Main,
  Input,
  Heading,
  ErrorText
} from "../../components/index";
import HistoryList from "./components/HistoryList/index";
import { addAddress, deleteAddress } from "../../store/actions/index";
import { connect } from "react-redux";
import { IStore } from "../../store/index";
import { IActions } from "../../store/actions/index";
import { isValidEthereum } from "../../../lib/ledger/index";
import styled, { colors } from "../../theme/index";

const ErrorWrapper: any = styled(View)`
  margin-bottom: 20;
`;

const Content: any = styled(View)`
  padding-top: 20;
  padding-right: 20;
  padding-bottom: 20;
  padding-left: 20;  
`;

const mapStateToProps = (state: IStore) => ({
  addresses: state.addresses
});

const mapDispatchToProps = {
  addAddress,
  deleteAddress
};

interface IState {
  inputValue: string;
  inputValueValid: boolean;
  showError: boolean;
}

@(connect(
  mapStateToProps,
  mapDispatchToProps
) as any)
class Home extends React.PureComponent<
  NavigationScreenProps & IStore & IActions,
  IState
> {
  public static navigationOptions = {
    title: "Home"
  };

  public state = {
    inputValue: "",
    inputValueValid: false,
    showError: false
  };

  public render() {
    return (
      <Main>
        <Content>
          <View style={{ marginBottom: 20 }}>
            <Heading>Search</Heading>
            <Input
              onChangeText={this.handleInputChangeText}
              onBlur={this.handleInputBlur}
              value={this.state.inputValue}
              allowFontScaling={false}
              placeholder="Address"
              placeholderTextColor={colors.gray1}
            />
            {this.state.showError && (
              <ErrorWrapper>
                <ErrorText>Entered ethereum address is invalid</ErrorText>
              </ErrorWrapper>
            )}
            <Button
              title="View"
              color={colors.blue}
              onPress={this.handleViewAddress}
              disabled={!this.state.inputValueValid}
            />
          </View>
          <Heading>History</Heading>
          <HistoryList
            onPress={this.handleHistoryItemPress}
            onDelete={this.handleHistoryItemDelete}
            data={this.props.addresses}
          />
        </Content>
      </Main>
    );
  }

  private handleInputChangeText = (text: string) => {
    const inputValue = text.trim().toLowerCase();
    const inputValueValid = isValidEthereum(inputValue);
    this.setState({
      ...this.state,
      inputValue,
      inputValueValid,
      showError: !inputValueValid
    });
  };

  private handleInputBlur = () => {
    if (!this.state.inputValueValid) {
      this.setState({ ...this.state, showError: true });
    }
  };

  private handleViewAddress = () => {
    new Promise(resolve => {
      this.props.addAddress(this.state.inputValue);
      resolve();
    }).then(() => {
      this.props.navigation.navigate("Detail", {
        address: this.state.inputValue
      });
    });
  };

  private handleHistoryItemPress = (address: string) => {
    this.props.navigation.navigate("Detail", { address });
  };

  private handleHistoryItemDelete = (id: string) => {
    Alert.alert(
      "Do you want to delete this item?",
      "",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "OK", onPress: () => this.props.deleteAddress(id) }
      ],
      { cancelable: true }
    );
  };
}

export default Home;
