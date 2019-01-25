import * as React from "react";
import { View, Modal, Button /*, ScrollView */ } from "react-native";
import styled, { colors } from "../../../../theme/index";

// tslint:disable-next-line no-empty
const noop = () => {};

const Content: any = styled(View)`
  flex: 1;
  padding-top: 20;
  padding-right: 20;
  padding-bottom: 20;
  padding-left: 20;
`;

const ButtonWrapper: any = styled(View)`
  margin-bottom: 20;
`;

interface IProps {
  children: React.ReactNode | React.ReactNodeArray;
  isVisible: boolean;
  onClose: () => void;
}

const TokensModal: React.SFC<IProps> = ({ children, isVisible, onClose }) => (
  <Modal
    visible={isVisible}
    animationType="slide"
    transparent={false}
    onRequestClose={noop}
  >
    <Content>
      <ButtonWrapper>
        <Button title="Close" color={colors.blue} onPress={onClose} />
      </ButtonWrapper>
      {children}
    </Content>
  </Modal>
);

export default TokensModal;
