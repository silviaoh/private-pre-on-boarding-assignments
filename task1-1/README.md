## 과제 1-1

---

## 10팀 멤버 구성

- 팀장 : [오지수](https://github.com/silviaoh)
- 부팀장 : [정억화](https://github.com/oka7759)
- 팀원 : [김미성](https://github.com/kimitt), [박민규](https://github.com/kyle970320), [송완준](https://github.com/natural-nine), [이학성](https://github.com/Hakseong-Lee), [김숙영](https://github.com/Maiowol), [김인표](https://github.com/kiminpyo)

## 목적

- 사전 과제에서 각자 구현한 결과물을 통해 토론하면서 특정 문제를 어떻게 해결하는 게 가장 좋은 방안인지 토론해서 팀의 Best Practice를 산출해주세요.

## 프로젝트 실행 방법

```
git clone https://github.com/silviaoh/wanted-preonboarding-fe-tasks.git
cd task1-1
npm install
npm run start

```

## 사용 라이브러리

<img src="https://img.shields.io/badge/react-444444?style=for-the-badge&logo=react"> <img src="https://img.shields.io/badge/styled--components-DB7093?style=for-the-badge&logo=styledcomponents&logoColor=white"> <img src="https://img.shields.io/badge/axios-FFCA28?style=for-the-badge&logo=axios&logoColor=white"> <img src="https://img.shields.io/badge/react_router_dom-CA4245?style=for-the-badge&logo=reactrouter&logoColor=white">
<img src="https://img.shields.io/badge/html5-E34F26?style=for-the-badge&logo=html5&logoColor=white">


## 최종 src 디렉토리 구조

```bash
 
 | - public
 | - src
  | - apis 
      | - api.js : axios 통신 모음
      | - interceptor.js : 인터셉터   
  | - components : 컴포넌트 관련 파일들
      | - Button.jsx
      | - CheckAccessToken.jsx : 토큰 유무 확인 컴포넌트
      | - Input.jsx
  | - pages
     | - Signin.jsx : 로그인 루트 컴포넌트
     | - Signup.jsx : 회원가입 루트 컴포넌트
     | - TodoList.jsx : 투두리스트 루트 컴포넌트
  | - styles : 스타일 관련 파일
     | - common.js
     | - global.js 
     | - theme.js
  | - index.js   
  | - router.js
  
```

## Best Practice

### prettier / eslint / husky 적용 여부

- 서로 협업할 때 prettier와 eslint, husky는 필수라고 생각되기 때문에 적용하였습니다.

### 재사용

- button과 input text는 동일한 UI를 사용하고 있기 때문에 Input.tsx, Button.tsx라는 공통 컴포넌트를 구현하여 놓고 이것을 재사용 했습니다.
- styled-components에서 동일하게 자주 사용하는 flex 속성을 따로 스타일을 구현해놓은 뒤 이것을 재사용하였습니다.
- 색상도 동일하게 사용되는 것이 있기 때문에 theme.js파일을 생성하여 사용하였습니다.

### 토큰 유무를 이용한 리다이렉트 처리

- `Router.jsx`에서 확인 가능
- 현재 사전 과제 상에서는 컴포넌트의 개수가 그리 많지 않기 때문에 각 페이지에서 처리를 할 수 있지만 만약 부피가 큰 프로젝트라면 단일 컴포넌트 상에서 일일히 처리하기가 어려워질 것을 고려하여 router에서 체킹을 하여 리다이렉트를 처리하였습니다.

### interceptor 적용

- 매번 axios 요청할 때마다 기본 URL을 설정하거나 또는 공통 headers를 설정할 때 등 겹치는 부분을 반복적으로 작성해주지 않기 위하여 interceptor를 만들어 api 코드에 적용시켰습니다.
 
 ```javascript
 


const customAxios = axios.create({
  baseURL: 'https://pre-onboarding-selection-task.shop',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});

customAxios.interceptors.request.use(
  config => {
    config.headers.Authorization = `Bearer ${localStorage.getItem(
      'access_token'
    )}`;
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

customAxios.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    return Promise.reject(error);
  }
);


```
### CheckAccessToken 적용

 ```javascript
 

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


 
 ```
 
### 팀으로 원활하게 일하기 위한 결정 사항들

1. commit message

- **Feat** : 새로운 기능 추가
- **Modify** : 단순 코드 수정
- **Fix** : 버그 수정
- **Docs** : 문서 수정
- **Style** : 서식 지정, 세미콜론 누락 등 코드 변경이 없는 경우에
- **Refactor** : 코드 리팩터링
- **Test** : 누락된 테스트 코드를 추가할 때
- **Chore** : 빌드 업무나 패키지 매니저 수정할 때
- **Comment** : 필요한 주석 추가 및 변경
- **Rename** : 파일 혹은 폴더명을 수정하거나 옮기는 작업만인 경우
- **Remove** : 파일을 삭제하는 작업만 수행한 경우
- **Add** : 파일 추가
- **ToSet :** 초기 세팅 시

ex) 예시

```
Feat: 관심지역 알림 ON/OFF 기능 추가

시군구의 알림을 각각 ON/OFF 할 수 있도록 기능을 추가함
 - opnion0055: 구분 코드
```

2. npm vs yarn

- npm 사용하다가 추후에 상의하여 yarn도 한 번 사용해 볼 예정임

3. history 관리

- `main - develop - (커스텀 브랜치)`
- develop에서 커스텀 브랜치를 만들어서 해당 브랜치에서 작업을 진행한 뒤 develop에 merge를 진행합니다.
- main 브랜치로는 최종적으로 작업이 다 마무리되었을 때 merge하도록 합니다.
- 커스텀 브랜치는 기능 단위로 생성하도록 합니다.

4. 사용하기로 한 tools

- Notion
- Discord

## 배포 주소

- [https://wanted-preonboarding-fe-tasks.vercel.app/](https://wanted-preonboarding-fe-tasks.vercel.app/)
