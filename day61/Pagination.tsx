import styled from "styled-components";
import { Pagination as IPagination } from "../../models/pagination.model";
import { LIMIT } from "../../constants/pagination";
import Button from "../common/Button";
import { useSearchParams } from "react-router-dom";
import { QUERY_STRING } from "../../constants/queryString";

interface PaginationProps {
  pagination: IPagination;
}

const Pagination = ({ pagination }: PaginationProps) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { currentPage, totalCount } = pagination;
  const pages: number = Math.ceil(totalCount / LIMIT);

  const handlePageClikc = (page: number) => {
    const newSearchParams = new URLSearchParams(searchParams);

    newSearchParams.set(QUERY_STRING.PAGE, page.toString());

    setSearchParams(newSearchParams);
  };

  return (
    <StyledPagination>
      {pages > 0 && (
        <ol>
          {Array(pages)
            .fill(0)
            .map((_, index) => (
              <li key={index}>
                {index + 1}{" "}
                <Button
                  size="small"
                  scheme={currentPage === index + 1 ? "primary" : "normal"}
                  onClick={() => {
                    handlePageClikc(index + 1);
                  }}
                >
                  {index + 1}
                </Button>
              </li>
            ))}
        </ol>
      )}
    </StyledPagination>
  );
};

const StyledPagination = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
  padding: 24px 0;

  ol {
    list-style: none;
    display: flex;
    gap: 8px;
    margin: 0;
    padding: 0;
  }
`;

export default Pagination;
