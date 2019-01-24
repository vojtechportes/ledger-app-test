import styled from "../../theme/index";
import { TextInput } from "react-native";

const Input: any = styled(TextInput)`
  margin-bottom: 20;
  padding-top: 6;
  padding-right: 10;     
  padding-bottom: 6; 
  padding-left: 10;
  border: 1px solid ${({ theme }) => theme.colors.gray3};
`;

export default Input;
