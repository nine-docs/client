import { useQuery } from "@tanstack/react-query";

import httpClient from "apis/networks/HttpClient";
import queryKeyFactory from "apis/query_config/queryKeyFactory";

type getArticlePayloadType = {
  articleId: number;
};

type getArticleResponseType = {
  success: boolean;
  data: {
    title: string;
    contents: null | string;
    category: {
      id: number;
      title: string;
    };
  };
};

const mockData = {
  success: true,
  data: {
    title: "문제 제목",
    contents: `
### 웹 화면을 렌더링하는 방식 **SSR** vs **CSR** 
**SSR**과 **CSR**은 대표적인 웹 렌더링 방식이다. 용어를 보고 오해할 수 있지만 100% 서버만 또는 100% 클라이언트(브라우저)만 일을 하는 것은 아니다. 웹에 렌더링하기 위해서는 브라우저가 일을 해야하며, 적어도 최초 한 번은 서버로부터 페이지의 기본 정보를 받아와야 한다. 


CSR방식에서는 사용자가 메인 페이지에 접속하면, 브라우저가 해당 웹 애플리케이션에 필요한 HTML과 정적 자원 (CSS, js, 이미지 리소스 등)을 서버에 요청한다. 서버에서 기초적인 HTML과 자원들을 전송해주면 브라우저는 HTML을 해석하여 DOM을 생성하고 자원들을 다운로드한다. 이벤트 리스너도 바로 이 때, DOM이 생성될 때 부착한다.

SSR 방식에서는 각 페이지 URL마다 보여줄 내용이 미리 결정되어 있다. 사용자가 웹 페이지에 접속하면 브라우저가 해당 URL을 서버에 요청하고, 서버는 이 URL을 기준으로 어떤 페이지를 렌더링할지 결정한다. 서버는 렌더링 엔진을 이용해 페이지를 렌더하고, 완성된 HTML을 브라우저에 응답한다. HTML뿐 아니라, 필요에 따라 js 파일 등의 추가 리소스도 포함될 수 있다. 이후 CSR와 마찬가지로 HTML을 해석하여 DOM을 생성하고 Hydration을 수행한다.

\`\`\`
"use client"

export default MyPage () {
    return (
        <html>
            <head></head>
            <body></body>
        </html>
    )
}
\`\`\`

_< 참고 >_
- [What is Hydration?](https://www.youtube.com/watch?v=D46aT3mx9LU)`,
    category: {
      id: 1,
      title: "카테고리 제목 임시",
    },
  },
};
const useGetArticle = ({ articleId }: getArticlePayloadType) => {
  const isApiMock = process.env.REACT_APP_API_MOCK === "true";

  const params = { articleId: articleId };

  const fallback = {
    success: true,
    data: {
      title: "",
      contents: "",
      category: {
        id: 0,
        title: "",
      },
    },
  };

  const { data = fallback } = useQuery({
    queryKey: queryKeyFactory.article(params).queryKey,
    queryFn: (): Promise<getArticleResponseType> => {
      if (isApiMock) {
        return new Promise((resolve) =>
          setTimeout(() => resolve(mockData), 500),
        );
      } else {
        return httpClient.get(`/api/v1/article/${articleId}`);
      }
    },
  });

  return { data };
};

export default useGetArticle;
