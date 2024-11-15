import styled from "styled-components";
import Button from "../common/Button";
import { FaTh, FaList } from "react-icons/fa";
import { useSearchParams } from "react-router-dom";
import { QUERY_STRING } from "../../constants/queryString";
import { useEffect } from "react";

const viewOptions = [
  { value: "list", icon: <FaList /> },
  { value: "grid", icon: <FaTh /> },
];

export type ViewMode = "list" | "grid";

const BooksViewSwitcher = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleSwitchView = (view: ViewMode) => {
    const newSearchParams = new URLSearchParams(searchParams);

    newSearchParams.set(QUERY_STRING.VIEW, view);

    setSearchParams(newSearchParams);
  };

  useEffect(() => {
    if (!searchParams.get(QUERY_STRING.VIEW)) {
      handleSwitchView("grid");
    }
  }, []);

  return (
    <StyledBooksViewSwitcher>
      {viewOptions.map((option) => (
        <Button
          key={option.value}
          scheme={
            searchParams.get(QUERY_STRING.VIEW) === option.value
              ? "primary"
              : "normal"
          }
          size="small"
          onClick={() => handleSwitchView(option.value as ViewMode)}
        >
          {option.icon}
        </Button>
      ))}
    </StyledBooksViewSwitcher>
  );
};

const StyledBooksViewSwitcher = styled.div`
  display: flex;
  gap: 8px;

  svg {
    fill: #fff;
  }
`;

export default BooksViewSwitcher;
