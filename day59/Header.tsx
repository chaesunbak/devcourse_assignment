import styled from "styled-components";
import ThemeSwitcher from "../header/ThemeSwitcher";
import Logo from "../../assets/images/logo.webp";
import { FaSignInAlt, FaRegUser } from "react-icons/fa";

const CATEGORY = [
  { id: null, name: "전체" },
  { id: 0, name: "동화" },
  { id: 1, name: "소설" },
  { id: 2, name: "사회" },
];

const Header = () => {
  return (
    <StyledHeader>
      <h1 className="logo">
        <img src={Logo} alt="Book Store 로고" />
      </h1>
      <nav className="category">
        <ul>
          {CATEGORY.map((category) => {
            return (
              <li key={category.id}>
                <a
                  href={
                    category.id === null
                      ? "books"
                      : `/books?category_id=${category.id}`
                  }
                >
                  {category.name}
                </a>
              </li>
            );
          })}
        </ul>
      </nav>
      <nav className="auth">
        <ul>
          <li>
            <FaSignInAlt />
            <a href="/login">로그인</a>
          </li>
          <li>
            <FaRegUser />
            <a href="/register">회원가입</a>
          </li>
        </ul>
      </nav>
    </StyledHeader>
  );
};

const StyledHeader = styled.header`
  width: 100%;
  margin: 0 auto;
  max-width: ${({ theme }) => theme.layout.width.large};

  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 0;
  border-bottom: 1px solid ${({ theme }) => theme.colors.background};

  .logo {
    img {
      width: 200px;
    }
  }

  .category {
    ul {
      display: flex;
      gap: 32px;
      li {
        a {
          font-size: 1.5rem;
          font-weight: 600;
          text-decoration: none;
          color: ${({ theme }) => theme.colors.text};
          &:hover {
            color: ${({ theme }) => theme.colors.primary};
          }
        }
      }
    }
  }

  .auth {
    ul {
      display: flex;
      gap: 16px;
      li {
        display: flex;
        gap: 16px;
        a {
          font-size: 1rem;
          font-weight: 600;
          text-decoration: none;
          display: flex;
          align-items: center;
          line-height: 1;

          svg {
            margin-right: 6px;
          }
        }
      }
    }
  }
`;

export default Header;
