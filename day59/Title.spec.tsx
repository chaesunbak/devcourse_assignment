import { render, screen } from "@testing-library/react";
import Title from "./Titlte";
import { BookStoreThemeProvider } from "../../context/themeContext";

describe("타이틀 컴포넌트", () => {
  it("의 제목은 문서에 존재한다", () => {
    // 1. 렌더

    render(
      <BookStoreThemeProvider>
        <Title size="large">제목 테스트</Title>
      </BookStoreThemeProvider>
    );
    // 2. 확인
    const title = screen.getByText("제목 테스트");
    expect(title).toBeInTheDocument();
  });

  it("size  props을 올바르게 적용한다", () => {
    // 1. 렌더
    render(
      <BookStoreThemeProvider>
        <Title size="large">제목 테스트</Title>
      </BookStoreThemeProvider>
    );
    // 2. 확인
    const titleElement = screen.getByText("제목 테스트");
    expect(titleElement).toHaveStyle("font-size: 2rem");
  });

  it("color props을 올바르게 적용한다", () => {
    // 1. 렌더
    render(
      <BookStoreThemeProvider>
        <Title size="large" color="primary">
          제목 테스트
        </Title>
      </BookStoreThemeProvider>
    );

    // 2. 확인
    const titleElement = screen.getByText("제목 테스트");
    expect(titleElement).toHaveStyle("color: brown");
  });
});
