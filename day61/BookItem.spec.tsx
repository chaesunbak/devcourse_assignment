import React from "react";
import { render } from "@testing-library/react";
import { Book } from "../../models/book.model";
import BookItem from "./BookItem";
import { BookStoreThemeProvider } from "../../context/themeContext";

const dummyBook: Book = {
  id: 1,
  title: "프로그래밍 정석",
  img: 5,
  category_id: 1,
  summary: "Dummey Summary",
  author: "Dummey Author",
  price: 10000,
  likes: 1,
  form: "paperback",
  isbn: "dummyisbn",
  detail: "dummydetail",
  pages: 100,
  contents: "dummycontents",
  pubDate: "2021-01-01",
};

describe("BookItem은", () => {
  it("정상적으로 렌더링된다.", () => {
    const { getByText } = render(
      <BookStoreThemeProvider>
        <BookItem book={dummyBook} />
      </BookStoreThemeProvider>
    );

    expect(getByText(dummyBook.title)).toBeInTheDocument();
    expect(getByText(dummyBook.summary)).toBeInTheDocument();
    expect(getByText(dummyBook.author)).toBeInTheDocument();
    expect(getByText("10,000")).toBeInTheDocument();
    expect(getByText("1")).toBeInTheDocument();
  });
});
