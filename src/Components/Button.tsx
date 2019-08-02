import React from "react";
import { View, ActivityIndicator } from "react-native";
import styled from "styled-components/native";
import Theme from "../../Theme";

const Container = styled<any>(View)`
  border-radius: 10px;
  background-color: ${props => props.color};
  width: ${props => props.width};
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Text = styled.Text`
  color: ${Theme.whiteColor};
`;

interface IProps {
  text: string;
  color: string;
  width: number | string;
  loading?: boolean;
  className?: any;
}

const Button: React.SFC<IProps> = ({
  text,
  color,
  width,
  loading = false,
  className
}) => {
  return (
    <Container color={color} width={width} className={className}>
      {loading ? (
        <ActivityIndicator color={"white"} size={"small"} />
      ) : (
        <Text>{text}</Text>
      )}
    </Container>
  );
};

export default Button;
