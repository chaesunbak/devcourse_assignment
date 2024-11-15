import Title from "../components/common/Title";
import styled from "styled-components";
import BooksFilter from "../components/books/BooksFilter";
import BooksList from "../components/books/BooksList";
import BooksEmpty from "../components/books/BooksEmpty";
import Pagination from "../components/books/Pagination";
import { useBooks } from "../hooks/useBooks";
import BooksViewSwitcher from "../components/books/BooksViewSwitcher";

const Books = () => {
  const { books, pagination, isEmpty } = useBooks();
  return (
    <>
      <Title size="large">도서 검색 결과</Title>
      <StyledBooks>
        <div className="filter">
          <BooksFilter />
          <BooksViewSwitcher />
        </div>

        {!isEmpty && <BooksList books={books} />}
        {isEmpty && <BooksEmpty />}
        {!isEmpty && <Pagination pagination={pagination} />}
      </StyledBooks>
    </>
  );
};

const StyledBooks = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 24px;

  .filter {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px 0;
  }
`;

export default Books;
