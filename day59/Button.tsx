import styled from "styled-components";
import { ButtonSize, ButtonSheme } from "../../style/theme";
import { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  size: ButtonSize;
  scheme: ButtonSheme;
  disabled?: boolean;
  isLoading?: boolean;
}

const Button = ({
  children,
  size,
  scheme,
  disabled,
  isLoading,
}: ButtonProps) => {
  return (
    <StyledButton
      size={size}
      scheme={scheme}
      disabled={disabled}
      isLoading={isLoading}
    >
      {children}
    </StyledButton>
  );
};

const StyledButton = styled.button<Omit<ButtonProps, "children">>`
  font-size: ${({ theme, size }) => theme.buttonSize[size].fontSize};
  padding: ${({ theme, size }) => theme.buttonSize[size].padding};
  color: ${({ theme, scheme }) => theme.buttonSheme[scheme].color};
  background-color: ${({ theme, scheme }) =>
    theme.buttonSheme[scheme].backgroundColor};
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.default};
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
  pointer-events: ${({ disabled, isLoading }) =>
    disabled || isLoading ? "none" : "auto"};
  cursor: ${({ disabled }) => (disabled ? "none" : "pointer")};
`;

export default Button;
