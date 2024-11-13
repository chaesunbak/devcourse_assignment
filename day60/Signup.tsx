import styled from "styled-components";
import Title from "../components/common/Titlte";
import InputText from "../components/common/InputText";
import Button from "../components/common/Button";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { signup } from "../api/auth.api";
import { useNavigate } from "react-router-dom";
import { useAlert } from "../hooks/useAlert";

export interface SignupProps {
  email: string;
  password: string;
}

const Signup = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupProps>();
  const navigate = useNavigate();
  const { showAlert } = useAlert();

  const onSubmit = (data: SignupProps) => {
    signup(data).then((response) => {
      showAlert("회원가입이 완료되었습니다.");
      navigate("/login");
    });
  };

  return (
    <>
      <Title size="large">회원가입</Title>
      <StyledSignup>
        <form onSubmit={handleSubmit(onSubmit)}>
          <fieldset>
            <InputText
              placeholder="이메일"
              inputType="eamil"
              {...register("email", { required: true })}
            />
            {errors.email && (
              <p className="error-text">이메일을 입력해주세요.</p>
            )}
          </fieldset>
          <fieldset>
            <InputText
              placeholder="비밀번호"
              inputType="password"
              {...register("password", { required: true })}
            />
            {errors.password && (
              <p className="error-text">비밀번호를 입력해주세요.</p>
            )}
          </fieldset>
          <fieldset>
            <Button size="medium" scheme="primary" type="submit">
              회원가입
            </Button>
          </fieldset>
          <div className="info">
            <Link to="/reset">비밀번호 초기화</Link>
          </div>
        </form>
      </StyledSignup>
    </>
  );
};

const StyledSignup = styled.div`
  max-width: ${({ theme }) => theme.layout.width.small};
  margin: 80px auto;

  fieldset {
    border: 0;
    padding: 0 0 8px 0;
    .error-text {
      color: red;
    }
  }

  input {
    width: 100%;
  }

  button {
    width: 100%;
  }

  .info {
    text-align: center;
    padding: 16px 0 0 0;
  }
`;

export default Signup;
