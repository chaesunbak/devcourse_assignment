import { render, screen } from "@testing-library/react";
import { BookStoreThemeProvider } from "../../context/themeContext";
import InputText from "./InputText";
import { createRef } from "react";

describe("인풋텍스트 컴포넌트", () => {
  it("의 제목은 문서에 존재한다", () => {
    // 1. 렌더

    render(
      <BookStoreThemeProvider>
        <InputText placeholder="여기에 입력하세요" />
      </BookStoreThemeProvider>
    );

    // 2. 확인
    expect(
      screen.getByPlaceholderText("여기에 입력하세요")
    ).toBeInTheDocument();
  });

  it("fowardRef를 통해 ref를 전달받는다", () => {
    // 1. 렌더
    const ref = createRef<HTMLInputElement>();
    render(
      <BookStoreThemeProvider>
        <InputText placeholder="여기에 입력하세요" ref={ref} />
      </BookStoreThemeProvider>
    );

    // 2. 확인
    expect(ref.current).toBeInInstanceof(HTMLInputElement);
  });
});
