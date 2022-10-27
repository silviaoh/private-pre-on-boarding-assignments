import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

/**
 * 로그인 리다이렉트 처리
 * @param props
 * @returns 로그인 여부에 따라 적합한 컴포넌트
 */
const CheckAccessToken = props => {
  const { children } = props;
  const access_token = localStorage.getItem('access_token');
  const location = useLocation();

  if (location.pathname === '/' && access_token) {
    // 로그인 상태일 때 루트 페이지에 접근한다면
    return <Navigate to="/todo" state={{ from: location }} replace />;
  } else if (location.pathname === '/todo' && !access_token) {
    // 로그아웃 상태일 때 투두페이지로 접근한다면
    return <Navigate to="/" state={{ from: location }} replace />;
  } else {
    return children;
  }
};

export default CheckAccessToken;
