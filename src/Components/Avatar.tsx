import React from "react";
import styled from "styled-components/native";
import { Image } from "react-native";

const Container = styled<any>(Image)`
  width: ${props => props.width};
  height: ${props => props.width};
  border-radius: ${props => props.radius};
`;

interface IProps {
  width: string;
  radius: string;
  uri: string | null;
}
const Avatar: React.SFC<IProps> = ({ width, radius, uri }) => {
  if (uri === null || uri === "") {
    return (
      <Container
        source={require("../../assets/noPhoto.jpg")}
        width={width}
        radius={radius}
      />
    );
  } else {
    return <Container source={{ uri }} width={width} radius={radius} />;
  }
};

export default Avatar;
