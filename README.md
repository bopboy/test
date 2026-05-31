# 간단한 TTS 앱

문장을 입력하고 버튼을 눌러 읽어주는 TTS 서비스를 만들기 위한 연습용 프로젝트입니다.

## 현재 단계

현재는 1단계 작업으로 기본 HTML 구조만 준비되어 있습니다.

- 제목
- 문장 입력 영역
- 읽기 버튼
- 정지 버튼
- 안내 메시지 영역
- `style.css` 연결
- `script.js` 연결

아직 CSS 스타일과 JavaScript TTS 기능은 구현되지 않았습니다.

## 결과 확인 방법

### 방법 1: 작업 브랜치에서 GitHub Pages 미리보기로 바로 확인하기

이 프로젝트는 `main`에 병합하기 전에도 작업 브랜치를 GitHub Pages의 별도 경로로 배포하도록 설정되어 있습니다. 따라서 로컬로 내려받지 않고, 브랜치에 커밋을 푸시한 뒤 클라우드 URL로 바로 확인할 수 있습니다.

1. 작업 브랜치에 변경 사항을 커밋하고 GitHub에 푸시합니다.
2. GitHub 저장소의 `Actions` 탭을 엽니다.
3. `Deploy static TTS app previews` 워크플로가 성공했는지 확인합니다.
4. 워크플로 로그의 `Print preview URL` 단계에 출력된 주소를 엽니다.
5. 작업 브랜치의 미리보기 주소는 보통 다음 형식입니다.

```text
https://<GitHub 사용자명>.github.io/<저장소명>/previews/<브랜치명>/
```

브랜치명에 `/`가 들어가면 URL 경로에서는 `-`로 바뀝니다. 예를 들어 `feature/tts-html` 브랜치는 다음과 같은 경로로 배포됩니다.

```text
https://<GitHub 사용자명>.github.io/<저장소명>/previews/feature-tts-html/
```

> 참고: 저장소에서 처음 한 번은 `Settings` → `Pages`의 `Build and deployment` 소스를 `Deploy from a branch`로 선택하고, 브랜치를 `gh-pages` / `(root)`로 설정해야 합니다.

### 방법 2: `main` 배포 결과 확인하기

`main` 브랜치에 푸시되면 같은 워크플로가 사이트 루트에 배포합니다.

```text
https://<GitHub 사용자명>.github.io/<저장소명>/
```

### 방법 3: GitHub Codespaces에서 브라우저 미리보기로 확인하기

브랜치 푸시 전 임시로 확인하고 싶다면 GitHub Codespaces의 포트 미리보기를 사용할 수 있습니다.

1. GitHub 저장소에서 `Code` → `Codespaces` → `Create codespace on <브랜치명>`을 선택합니다.
2. Codespaces 터미널에서 다음 명령어를 실행합니다.

```bash
python3 -m http.server 8000
```

3. Codespaces가 표시하는 `Open in Browser` 또는 포트 `8000`의 전달 URL을 엽니다.
4. 확인이 끝나면 터미널에서 `Ctrl + C`를 눌러 서버를 종료합니다.

## 다음 단계

다음 단계에서는 `style.css`에 기본 화면 스타일을 추가해서 입력창과 버튼이 보기 좋게 배치되도록 만들 예정입니다.
