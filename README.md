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

### 방법 1: GitHub Pages로 클라우드에서 바로 확인하기

이 프로젝트는 GitHub Pages 배포 워크플로를 포함합니다. PR이 `main` 브랜치에 병합되면 GitHub Actions가 정적 사이트를 배포하므로, 로컬로 내려받지 않아도 브라우저에서 바로 확인할 수 있습니다.

1. GitHub 저장소의 `Actions` 탭을 엽니다.
2. `Deploy static TTS app to GitHub Pages` 워크플로가 성공했는지 확인합니다.
3. 성공한 워크플로 실행 화면의 `deploy` 작업에서 `github-pages` 배포 URL을 엽니다.
4. 보통 배포 주소는 `https://<GitHub 사용자명>.github.io/<저장소명>/` 형식입니다.

> 참고: 저장소 설정에서 GitHub Pages가 비활성화되어 있다면 `Settings` → `Pages`에서 `Source`를 `GitHub Actions`로 설정해야 합니다.

### 방법 2: GitHub Codespaces에서 브라우저 미리보기로 확인하기

GitHub Pages 배포 전에도 클라우드 개발 환경에서 바로 확인할 수 있습니다.

1. GitHub 저장소에서 `Code` → `Codespaces` → `Create codespace on main`을 선택합니다.
2. Codespaces 터미널에서 다음 명령어를 실행합니다.

```bash
python3 -m http.server 8000
```

3. Codespaces가 표시하는 `Open in Browser` 또는 포트 `8000`의 전달 URL을 엽니다.
4. 확인이 끝나면 터미널에서 `Ctrl + C`를 눌러 서버를 종료합니다.

### 방법 3: 로컬에서 확인하기

로컬로 내려받아 확인해야 하는 경우에는 프로젝트 폴더에서 `index.html`을 직접 열거나 다음 명령어로 로컬 서버를 실행합니다.

```bash
python3 -m http.server 8000
```

그 다음 브라우저에서 `http://localhost:8000`으로 접속합니다.

## 다음 단계

다음 단계에서는 `style.css`에 기본 화면 스타일을 추가해서 입력창과 버튼이 보기 좋게 배치되도록 만들 예정입니다.
