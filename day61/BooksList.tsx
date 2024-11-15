import styled from "styled-components";
import BookItem from "./BookItem";
import { Book } from "../../models/book.model";
import { useLocation } from "react-router";
import { useEffect, useState } from "react";
import { QUERY_STRING } from "../../constants/queryString";
import { ViewMode } from "./BooksViewSwitcher";

interface BooksListProps {
  books: Book[];
}
const BooksList = ({ books }: BooksListProps) => {
  const [view, setView] = useState<ViewMode>("grid");
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (params.get(QUERY_STRING.VIEW)) {
      const viewMode = params.get(QUERY_STRING.VIEW) as ViewMode;
      if (viewMode) {
        setView(viewMode);
      }
    }
  }, [location.search]);
  return (
    <StyledBooksList view={view}>
      {books?.map((book) => (
        <BookItem key={book.id} book={book} view={view} />
      ))}
    </StyledBooksList>
  );
};

interface BooksListStyleProps {
  view: ViewMode;
}

const StyledBooksList = styled.div<BooksListStyleProps>`
  display: grid;
  grid-template-columns: ${({ view }) =>
    view === "grid" ? "repeat(4, 1fr)" : "repeat(1, 1fr)"};
  gap: 24px;
`;

export default BooksList;
