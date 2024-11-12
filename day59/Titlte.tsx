import styled from "styled-components";
import { ReactNode } from "react";
import { Colorkey, HeadingSize } from "../../style/theme";

interface TitleProps {
  children: ReactNode;
  size: HeadingSize;
  color?: Colorkey;
}

const Title = ({ children, size, color }: TitleProps) => {
  return (
    <TitleStyled size={size} color={color}>
      {children}
    </TitleStyled>
  );
};

const TitleStyled = styled.h1<Omit<TitleProps, "children">>`
  font-size: ${({ theme, size }) => theme.heading[size].fontSize};
  color: ${({ theme, color = "primary" }) => theme.colors[color]};
`;

export default Title;
