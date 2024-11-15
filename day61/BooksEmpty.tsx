import styled from "styled-components";
import { FaSmileWink } from "react-icons/fa";
import Title from "../common/Title";
import { Link } from "react-router-dom";

const BooksEmpty = () => {
  return (
    <StyledBooksEmpty>
      <div className="icon">
        <FaSmileWink />
      </div>
      <Title size="large" color="secondary">
        검색 결과가 없습니다.
      </Title>
      <p>
        <Link to="/books">전체 검색 결과로 이동</Link>
      </p>
    </StyledBooksEmpty>
  );
};

const StyledBooksEmpty = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
  padding: 120px 0;

  .icon {
    svg {
      font-size: 4rem;
      color: #ccc;
    }
  }
`;

export default BooksEmpty;
