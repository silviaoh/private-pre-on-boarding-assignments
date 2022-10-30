# 원티드 프리온보딩 프론트엔드 - Week 1-2

## 10팀 맴버 구성

<br/>

<div align=center>
	
| <img src="https://avatars.githubusercontent.com/u/26901045?v=4" width="130" height="130" />  | <img src="https://avatars.githubusercontent.com/u/105492051?v=4" width="130" height="130" /> | <img src="https://avatars.githubusercontent.com/u/92094314?v=4" width="130" height="130"/> | <img src="https://avatars.githubusercontent.com/u/101456751?v=4" width="130" height="130"/> |
| :-----------------------------------------------------------------------------------------:  | :-----------------------------------------------------------------------------------------:  | :----------------------------------------------------------------------------------------: | :----------------------------------------------------------------------------------------:  |
|                                    :full_moon: 오지수                                         |                                :last_quarter_moon: 정억화                                    |                                           송완준                                            |                                            김미성                                            |
|                [:globe_with_meridians:silviaoh](https://github.com/silviaoh)                 |                 [:globe_with_meridians:oka7759](https://github.com/oka7759)                  |            [:globe_with_meridians:natural-nine](https://github.com/natural-nine)           |                  [:globe_with_meridians:kimitt](https://github.com/kimitt)                  |

| <img src="https://avatars.githubusercontent.com/u/83964261?v=4" width="130" height="130" /> | <img src="https://avatars.githubusercontent.com/u/103277726?v=4" width="130" height="130" /> | <img src="https://avatars.githubusercontent.com/u/93189402?v=4"  width="130" height="130" /> | <img src="https://avatars.githubusercontent.com/u/109638284?v=4" width="130" height="130"/> |
| :-----------------------------------------------------------------------------------------: | :------------------------------------------------------------------------------------------: | :------------------------------------------------------------------------------------------: | :-----------------------------------------------------------------------------------------: |
|                                           이학성                                            |                                            김숙영                                            |                                            김인표                                            |                                           박민규                                            |
|            [:globe_with_meridians:Hakseong-Lee](https://github.com/Hakseong-Lee)            |                 [:globe_with_meridians:Maiowol](https://github.com/Maiowol)                  |                [:globe_with_meridians:kiminpyo](https://github.com/kiminpyo)                 |              [:globe_with_meridians:kyle970320](https://github.com/kyle970320)              |

</div>

<br/>

## 프로젝트 요약

### 📆 기간

#### 22년 10월 29일 ~ 22년 10월 31일

### 🔧 기술 스택

<div align=center> 
  <img src="https://img.shields.io/badge/react-61DAFB?style=for-the-badge&logo=react&logoColor=black"/> 
  <img src="https://img.shields.io/badge/javascript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black"/>   
  <img src="https://img.shields.io/badge/styled_components-DB7093?style=for-the-badge&logo=styled-components&logoColor=white"/><br/>
  <img src="https://img.shields.io/badge/github-181717?style=for-the-badge&logo=github&logoColor=white"/>
  <img src="https://img.shields.io/badge/git-F05032?style=for-the-badge&logo=git&logoColor=white"/> <img src="https://img.shields.io/badge/react_router_dom-CA4245?style=for-the-badge&logo=reactrouter&logoColor=white"/> 
 <img src=" https://img.shields.io/badge/Octokit-007ACC?style=for-the-badge&logo=octokit&logoColor=white"/> 
</div>

### 💻 실행 방법

1.  src상단에 .env 파일을 생성합니다.

```javascript
  REACT_APP_GITHUB_TOKEN={사용자의 토큰을 입력}
```

2.  라이브러리를 설치합니다.

```
npm install
```

3.  프로젝트를 실행합니다.

```
 npm start
```

<br/>

### 배포 링크

[배포링크 바로가기](https://wanted-preonboarding-fe-tasks.vercel.app/)

<br/>

## 프로젝트 설명

### 📂 디렉토리 구조

<details>
<summary> 구조</summary>
<div markdown="1">

```
🗂 src
 ┣ 📁 actions
	 ┣ issue.js
	 ┣ issues.js
   ┗ types.js
 ┣ 📁 components
 ┣ 📁 api
	 ┣ index.js
 ┣ 📂 context
	 ┣ IssueContext.js
	 ┣ IssuesContext.js
   ┗ IssuesContext.jsx
 ┣ 📂 pages
   ┣ Error404Pages.jsx
   ┣ Issues.jsx
   ┗ Issue.jsx
 ┣ 📂 hoc
   ┣ withCheckPageState.jsx
 ┣ 📂 hooks
   ┣ useGetContextState.js
 ┣ 📂 styles
   ┣ GlobalStyle.jsx
   ┗ common.js
 ┣ App.js
 ┣ index.js
 ┗ router.js
```

</div>
</details>

### ⚙️ 구현기능

1.  공통헤더

```
- organization name 과 repository name이 포함된 헤더가 모든 페이지의 상단에 위치해 있도록 구현
```

2.  GitHub 이슈 목록 화면

```
- 데이터 찾지 못할 시 Error Page 구현
- 데이터 요청 중 Loading 기능 구현
- Context API를 활용하여 GitHub 이슈 리스트를 저장하고 무한 스크롤 구현
- GitHub 이슈 목록 open 상태일 때 코멘트가 많은 순으로 정렬
```

3.  Github 이슈 상세 화면

```
- 이슈 상세 내용 표시 - 이슈 번호, 이슈 제목, 작성자, 작성일, 코멘트 수 표시
```

<br/>

### 10팀의 Best Practice 선정 내용

---

<br/>

**1. 다섯번째 셀에는 광고 이미지 출력**

```js
<React.Fragment key={`${issue.id}${issueIdx}`}>
  <Link to={`/issue/${issue.number}`}>
    <IssueItem issue={issue} />
  </Link>
  {issueIdx === 4 && (
    <ImageBox>
      <img
        src="https://image.wanted.co.kr/optimize?src=https%3A%2F%2Fstatic.wanted.co.kr%2Fimages%2Fuserweb%2Flogo_wanted_black.png&w=110&q=100"
        alt="banner"
      />
    </ImageBox>
  )}
</React.Fragment>
```

  <br/>

**2. Infinite Scroll : 화면을 아래로 스크롤 할 시 이슈 목록 추가 로딩**

- **Intersaction Observer 선정 이유** : 무한 스크롤을 구현하는 방법에는 라이브러리 사용 외에 scroll Event를 사용하는 방법과 Intersection Observer를 사용하는 방법이 있다. Intersection Observer는 Scroll Event의 문제를 보완하기 위해서 나온 Javascript 내장 API이다. Scroll Event는 여러번 호출될 수 있고 이것을 해결하기 위해 Throttling 또는 Debouncing 기법을 이용할 수 있지만 Observer를 사용하면 타겟 엘리먼트가 화면 상에서 교차되었을 때를 Observer가 관찰하여 비동기적으로 호출 시키기 때문에 간단히 성능을 높일 수 있다.

     <details>
       <summary>Code 더보기</summary>

  ```js
  useEffect(() => {
    const isEnabledAPICall = !issuesState.data;
    if (isEnabledAPICall) getIssues(0, dispatch);
  }, []);

  const onIntersect = useCallback(
    async ([entry], observer) => {
      if (entry.isIntersecting) {
        observer.unobserve(entry.target);
        await getIssues(issuesState.nextPage, dispatch);
        observer.observe(entry.target);
      }
    },
    [issuesState.nextPage, dispatch]
  );

  useEffect(() => {
    const isNotEndPage = issuesState.nextPage !== 0;
    const isEnabledObserver =
      observerRef?.current && isNotEndPage && !issuesState.isLoading;

    let io;
    const observerBoundary = observerRef?.current;

    if (isEnabledObserver) {
      io = new IntersectionObserver(onIntersect, { threshold: 1 });
      io.observe(observerBoundary);
    }

    return () => io && io.disconnect();
  }, [issuesState.isLoading, issuesState.nextPage, onIntersect]);
  ```

    </details>
    <br/>

**3. Octokit 사용하여 이슈 목록 가져오기 API 활용**

- **Octokit 선정 이유** : axios와 Octokit 사용 방식은 비슷하나 Octokit은 깃헙에서 자체적으로 제작한 API Wrapper이기 때문에 이번 프로젝트에서 사용하는 Github issue API를 좀 더 간편하게 호출할 수 있기 때문에 선택하였음
    <details>
      <summary>Code 더보기</summary>

  ```js
  import { Octokit } from 'octokit';

  const octokit = new Octokit({
    auth: process.env.REACT_APP_GITHUB_TOKEN,
  });

  export const getIssuesAPI = async (page = 0) =>
    await octokit
      .request(`GET /repos/angular/angular-cli/issues`, {
        sort: 'comments',
        page,
      })
      .then(res => res.data);

  export const getIssueAPI = async issueNumber =>
    await octokit
      .request(`GET /repos/angular/angular-cli/issues/${issueNumber}`, {})
      .then(res => res.data);
  ```

    </details>
    <br/>

**4. Context API + useReducer를 통해 전역으로 상태 관리**

- 기능을 명확히 하기 위해서 context, reducer, action 으로 분리하여 코드 및 상태 관리를 적용하였음

### 📝 Meeting Log

[회의록 바로가기](https://www.notion.so/Meeting-log-3eff6566fd844052b7a98702ebab8c5b?p=1e14e81a8e4a4deda8d067c61beb76ab&pm=s)
