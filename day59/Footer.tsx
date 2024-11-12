import Logo from "../../assets/images/logo.webp";
import styled from "styled-components";

const Footer = () => {
  return (
    <StyledFooter>
      <h1 className="logo">
        <img src={Logo} alt="Book Store 로고" />
      </h1>
      <div className="copyright">
        <p>copyright©, 2024. Book Store</p>
      </div>
    </StyledFooter>
  );
};

const StyledFooter = styled.footer`
  width: 100%;
  margin: 0 auto;
  max-width: ${({ theme }) => theme.layout.width.large};

  border-top: 1px solid ${({ theme }) => theme.colors.background};
  padding: 20px 0;
  display: flex;
  justify-content: space-between;

  .logo {
    img {
      width: 140px;
    }
  }

  .copyright {
    p {
      font-size: 0.75rem;
      color: ${({ theme }) => theme.colors.text};
    }
  }
`;

export default Footer;
