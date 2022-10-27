import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import { postSignup } from '../apis/api';
import Button from '../components/Button';
import Input from '../components/Input';
import { FlexWrapperStyle } from '../styles/common';

const Signup = () => {
  const navigate = useNavigate();

  //이메일, 비밀번호, 비밀번호 확인, 정보
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [inputInfo, setInputInfo] = useState({
    email: '',
    password: '',
  });

  //오류메시지 state
  const [emailMessage, setEmailMessage] = useState('');
  const [passwordMessage, setPasswordMessage] = useState('');
  const [passwordConfirmMessage, setPasswordConfirmMessage] = useState('');

  // 유효성 검사 state
  const [isEmail, setIsEmail] = useState(false);
  const [isPassword, setIsPassword] = useState(false);
  const [isPasswordConfirm, setIsPasswordConfirm] = useState(false);
  const [isValid, setIsValid] = useState(false);

  // 유효성 검사
  useEffect(() => {
    const emailRegex =
      /^([0-9a-zA-Z_.-]+)@([0-9a-zA-Z_-]+)(\.[0-9a-zA-Z_-]+){1,2}$/;
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
      setIsPassword(true);
      setPasswordMessage('');
    } else {
      setIsPassword(false);
      setPasswordMessage('8글자 이상 입력하세요.');
    }
    const passwordConfirmValidation = password !== passwordConfirm;
    if (!passwordConfirmValidation && password !== '') {
      setIsPasswordConfirm(true);
      setPasswordConfirmMessage('');
    } else {
      setIsPasswordConfirm(false);
      setPasswordConfirmMessage('비밀번호가 일치하지 않습니다.');
    }
  }, [email, password, passwordConfirm]);

  // 버튼 활성화
  useEffect(() => {
    if (isEmail && isPassword && isPasswordConfirm) {
      setIsValid(true);
      setInputInfo({ email, password });
    } else {
      setIsValid(false);
    }
  }, [isEmail, isPassword, isPasswordConfirm, email, password]);
  // input 초기화
  const resetInput = () => {
    setInputInfo('', '');
    setEmail('');
    setPassword('');
    setPasswordConfirm('');
  };
  // 회원가입
  const handleSignUp = async e => {
    e.preventDefault();
    try {
      const res = await postSignup(inputInfo);
      localStorage.setItem('access_token', res.data.access_token);
      alert('회원가입에 성공하였습니다!');
      navigate('/');
    } catch (err) {
      resetInput();
      alert(err.response.data.message);
    }
  };

  return (
    <SignUpSection justifyContent="center" alignItems="center">
      <SignUpContainer flexDirection="column" alignItems="center">
        <SignUpForm flexDirection="column" alignItems="center">
          <SignUpHeader>회원가입</SignUpHeader>
          <Input
            label="이메일"
            type="email"
            name="email"
            value={email}
            pattern=".[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
            title="이메일 형식을 확인하세요."
            onChange={e => setEmail(e.target.value)}
          />
          {!email ? '' : <Message>{emailMessage}</Message>}
          <Input
            label="비밀번호"
            type="password"
            name="password"
            value={password}
            pattern=".{8,}"
            required
            title="8글자 이상 입력해주세요."
            onChange={e => setPassword(e.target.value)}
          />
          {!password ? '' : <Message>{passwordMessage}</Message>}
          <Input
            label="비밀번호 확인"
            type="password"
            name="password"
            value={passwordConfirm}
            pattern=".{8,}"
            required
            title="비밀번호가 일치하지 않습니다."
            onChange={e => setPasswordConfirm(e.target.value)}
          />
          {!passwordConfirm ? '' : <Message>{passwordConfirmMessage}</Message>}
          <ButtonContainer justifyContent="space-between">
            <Link to="/">로그인</Link>
            <Button onClick={handleSignUp} disabled={!isValid}>
              회원가입
            </Button>
          </ButtonContainer>
        </SignUpForm>
      </SignUpContainer>
    </SignUpSection>
  );
};

const SignUpSection = styled.section`
  ${FlexWrapperStyle}
  width: 100vw;
  height: 100vh;
`;

const SignUpContainer = styled.article`
  ${FlexWrapperStyle}
  width: 20rem;
  padding: 3rem 0;
  background: rgba(255, 255, 255, 0.4);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  backdrop-filter: blur(5.5px);
  -webkit-backdrop-filter: blur(5.5px);
  border-radius: 10px;
`;

const SignUpHeader = styled.h1`
  color: ${({ theme }) => theme.colors.white};
  padding-bottom: 1.5rem;
  font-size: 1.5rem;
`;

const Message = styled.span`
  align-self: flex-start;
  color: ${({ theme }) => theme.colors.red};
  text-shadow: none;
  font-size: 0.8rem;
  padding-left: 0.4rem;
`;

const SignUpForm = styled.form`
  ${FlexWrapperStyle}
  width: 100%;
  padding: 0 2rem;
`;

const ButtonContainer = styled.div`
  ${FlexWrapperStyle}
  width: 70%;
  padding-top: 2rem;
`;

export default Signup;
