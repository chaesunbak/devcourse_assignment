import { render, screen } from "@testing-library/react";
import Button from "./Button";
import { BookStoreThemeProvider } from "../../context/themeContext";

describe("버튼 컴포넌트는", () => {
  it("문서에 버튼이 존재한다", () => {
    // 1. 렌더
    render(
      <BookStoreThemeProvider>
        <Button size="large" scheme="primary">
          버튼 테스트
        </Button>
      </BookStoreThemeProvider>
    );
    // 2. 확인
    const button = screen.getByText("버튼 테스트");
    expect(button).toBeInTheDocument();
  });

  it("size props을 올바르게 적용한다", () => {
    // 1. 렌더
    render(
      <BookStoreThemeProvider>
        <Button size="large" scheme="primary">
          버튼 테스트
        </Button>
      </BookStoreThemeProvider>
    );
    // 2. 확인
    expect(screen.getByRole("button")).toHaveStyle("font-size: 1.5rem");
  });
});
