import { Text } from "react-native";
import styled from "../../theme/index";

const ErrorText: any = styled(Text)`
  color: ${({ theme }) => theme.colors.red};
`;

export default ErrorText;
