# AJ네트웍스 디자인 시스템 v3.0

공통 컴포넌트 디자인 시스템을 웹에서 확인할 수 있는 뷰어입니다.

## 🚀 빠른 시작

### 방법 1: 배치 파일 실행 (Windows)
```powershell
.\start-server.bat
```

### 방법 2: Node.js 직접 실행
```bash
node start-server.js
```

### 방법 3: HTML 파일 직접 열기
브라우저에서 `design-system-viewer.html` 파일을 직접 열어도 됩니다.

## 📋 요구사항

- Node.js (서버 실행 시 필요)
- 최신 웹 브라우저 (Chrome, Edge, Firefox 등)

## 🌐 접속 방법

서버가 시작되면 다음 주소로 접속할 수 있습니다:

- **로컬 접속**: `http://localhost:3000` (또는 표시된 포트)
- **네트워크 접속**: `http://[본인IP]:3000` (같은 네트워크의 다른 기기에서 접속 가능)

## 📦 포함된 컴포넌트

### Phase 1 컴포넌트 (17개)
- Button, Input, SearchInput, Checkbox
- Badge, Modal, Pagination, Tabs
- FavoriteButton, Table, Select
- TextArea, DatePicker, DateRangePicker
- TimePicker, MiniCalendar, FullCalendar

### Phase 2 컴포넌트 (4개)
- SummaryCard, ListModal, FilterSection, EmptyState

## 💡 주요 기능

1. **인터랙티브 데모**: 모든 컴포넌트를 바로 테스트할 수 있습니다
2. **코드 예제**: 각 컴포넌트의 사용 방법과 Props를 확인할 수 있습니다
3. **코드 복사**: 예제 코드를 클립보드로 복사할 수 있습니다
4. **네트워크 접근**: 같은 네트워크의 다른 기기에서도 접속 가능합니다

## 🔧 문제 해결

### 포트가 이미 사용 중인 경우
서버가 자동으로 사용 가능한 다음 포트를 찾아서 시작합니다 (3000, 3001, 3002...).

기존 서버를 종료하려면:
```powershell
.\kill-server.bat
```

### PowerShell에서 배치 파일 실행 오류
PowerShell에서는 `.\start-server.bat` 형식으로 실행하세요:
```powershell
.\start-server.bat
```

또는 cmd에서 실행:
```cmd
start-server.bat
```

### 서버가 시작되지 않는 경우
1. 포트를 사용하는 다른 프로세스가 있는지 확인:
   ```powershell
   netstat -ano | findstr :3000
   ```
2. 프로세스를 종료:
   ```powershell
   taskkill /F /PID [프로세스ID]
   ```
3. 또는 `kill-server.bat` 실행

## 📝 라이선스

AJ네트웍스 내부 사용
