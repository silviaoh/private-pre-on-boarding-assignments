import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import { postSignin } from '../apis/api';
import Button from '../components/Button';
import Input from '../components/Input';
import { FlexWrapperStyle } from '../styles/common';

const Signin = () => {
  const navigate = useNavigate();

  //이메일, 비밀번호 , 로그인 정보
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [inputInfo, setInputInfo] = useState({
    email: '',
    password: '',
  });

  //오류메시지 state
  const [emailMessage, setEmailMessage] = useState('');
  const [passwordMessage, setPasswordMessage] = useState('');

  // 유효성 검사 state
  const [isEmail, setIsEmail] = useState(false);
  const [isPassword, setIsPassword] = useState(false);
  const [isValid, setIsValid] = useState(false);

  // 유효성 검사
  useEffect(() => {
    const emailRegex =
      /^([0-9a-zA-Z_\.-]+)@([0-9a-zA-Z_-]+)(\.[0-9a-zA-Z_-]+){1,2}$/;
    const emailValidation = emailRegex.test(email);

    if (emailValidation) {
      setIsEmail(true);
      setEmailMessage('');
    } else {
      setIsEmail(false);
      setEmailMessage('이메일 형식을 확인하세요.');
    }
    const passwordValidation = password.length < 8;
    if (!passwordValidation) {
      setInputInfo({ email, password });
      setIsPassword(true);
      setPasswordMessage('');
    } else {
      setIsPassword(false);
      setPasswordMessage('8글자 이상 입력하세요.');
    }
  }, [email, password]);

  //버튼 활성화
  useEffect(() => {
    if (isEmail && isPassword) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  }, [isEmail, isPassword]);

  //로그인
  const handleSignIn = async e => {
    e.preventDefault();
    try {
      const response = await postSignin(inputInfo);
      localStorage.setItem('access_token', response.data.access_token);
      navigate('/todo');
    } catch (err) {
      alert(err.response.data.message);
    }
  };

  return (
    <LoginSection justifyContent="center" alignItems="center">
      <LoginContainer flexDirection="column" alignItems="center">
        <LoginForm flexDirection="column" alignItems="center" gap="0.4rem">
          <LoginHeader>로그인</LoginHeader>
          <Input
            type="email"
            name="email"
            value={email}
            pattern=".[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
            required
            title="Ex) wanted@gmail.com"
            placeholder="이메일을 입력하세요."
            onChange={e => setEmail(e.target.value)}
          />
          {!email ? '' : <Message>{emailMessage}</Message>}
          <Input
            type="password"
            name="password"
            value={password}
            pattern=".{8,}"
            required
            title="8글자 이상 입력해주세요."
            placeholder="비밀번호를 입력하세요."
            onChange={e => setPassword(e.target.value)}
          />
          {!password ? '' : <Message>{passwordMessage}</Message>}
          <ButtonContainer justifyContent="space-between">
            <Link to="/signup">회원가입</Link>
            <Button onClick={handleSignIn} disabled={!isValid}>
              로그인
            </Button>
          </ButtonContainer>
        </LoginForm>
      </LoginContainer>
    </LoginSection>
  );
};

const LoginSection = styled.section`
  ${FlexWrapperStyle}
  width: 100vw;
  height: 100vh;
`;

const LoginContainer = styled.article`
  ${FlexWrapperStyle}
  width: 20rem;
  padding: 3rem 0;
  background: rgba(255, 255, 255, 0.4);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  backdrop-filter: blur(5.5px);
  -webkit-backdrop-filter: blur(5.5px);
  border-radius: 10px;
`;

const LoginHeader = styled.h1`
  color: ${({ theme }) => theme.colors.white};
  padding-bottom: 2rem;
  font-size: 1.5rem;
`;

const LoginForm = styled.form`
  ${FlexWrapperStyle}
  width: 100%;
  padding: 0 2rem;
`;

const ButtonContainer = styled.div`
  ${FlexWrapperStyle}
  width: 70%;
  padding-top: 2rem;
`;

const Message = styled.span`
  align-self: flex-start;
  color: ${({ theme }) => theme.colors.red};
  text-shadow: none;
  font-size: 0.8rem;
  padding-left: 0.4rem;
`;

export default Signin;
