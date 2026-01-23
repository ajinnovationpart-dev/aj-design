# AJ네트웍스 모바일 디자인 시스템 가이드

> 터치 최적화된 모바일 전용 컴포넌트 라이브러리

---

## 📋 목차

1. [모바일 디자인 원칙](#모바일-디자인-원칙)
2. [컴포넌트 목록](#컴포넌트-목록)
3. [사용 방법](#사용-방법)
4. [컴포넌트 상세](#컴포넌트-상세)

---

## 📱 모바일 디자인 원칙

### 1. 터치 우선 (Touch First)
- **최소 터치 영역**: 44px × 44px (iOS 권장)
- **권장 터치 영역**: 48px × 48px
- **버튼 간 최소 간격**: 8px

### 2. 엄지손가락 존 (Thumb Zone)
```
┌─────────────────────────────┐
│         Hard to Reach       │ ← 상단 (정보 표시)
│                              │
│          Easy Reach         │ ← 중간 (주요 컨텐츠)
│                              │
│    ★ Natural Thumb Zone ★  │ ← 하단 (주요 액션)
└─────────────────────────────┘
```

### 3. Progressive Disclosure (점진적 공개)
- 한 화면에 하나의 주요 작업
- 탭으로 정보 분산
- 단계별 진행

### 4. Feedback (피드백)
- 터치 반응 (active state)
- 진동 피드백 (haptic)
- 시각적 변화 (색상, 크기)

---

## 📦 컴포넌트 목록

### Navigation (네비게이션)
1. **MobileHeader** - 모바일 헤더
2. **HorizontalTabs** - 가로 스크롤 탭

### Input (입력)
3. **ChipButton** - 칩 버튼
4. **ChipButtonGroup** - 칩 버튼 그룹
5. **MobileInput** - 모바일 입력 필드
6. **MobileDateTimePicker** - 날짜/시간 선택

### Selection (선택)
7. **ContactChip** - 연락처 칩
8. **IconSelectButton** - 아이콘 선택 버튼
9. **QuickSelectButtons** - 빠른 선택 버튼

### Layout (레이아웃)
10. **BottomFixedButton** - 하단 고정 버튼
11. **SectionHeader** - 섹션 헤더
12. **FavoriteLoadButton** - 즐겨찾기 불러오기

---

## 🚀 사용 방법

### 설치

```jsx
import {
  MobileHeader,
  HorizontalTabs,
  ChipButtonGroup,
  BottomFixedButton
} from './AJNetworks-Mobile-DesignSystem';
```

### 기본 사용 예시

```jsx
function TransportRequestApp() {
  const [activeTab, setActiveTab] = useState(0);
  const [temperature, setTemperature] = useState('상온');

  return (
    <div>
      <MobileHeader title="운송신청" onBack={() => {}} />
      
      <HorizontalTabs
        tabs={['차량정보', '상차정보', '하차정보']}
        activeIndex={activeTab}
        onChange={setActiveTab}
      />

      <div style={{ padding: '16px' }}>
        <ChipButtonGroup
          options={['상온', '냉장', '냉동']}
          value={temperature}
          onChange={setTemperature}
          columns={3}
        />
      </div>

      <BottomFixedButton onClick={handleNext}>
        다음
      </BottomFixedButton>
    </div>
  );
}
```

---

## 🎯 컴포넌트 상세

### 1. MobileHeader

모바일 상단 헤더 바입니다.

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | `string` | - | 헤더 타이틀 |
| `onBack` | `function` | - | 뒤로가기 핸들러 |
| `rightAction` | `ReactNode` | - | 우측 액션 (선택) |

#### 사용 예시

```jsx
<MobileHeader
  title="운송신청"
  onBack={() => navigation.goBack()}
  rightAction={<button>저장</button>}
/>
```

#### 디자인 가이드라인
- 높이: 56px
- 타이틀: 중앙 정렬
- 뒤로가기: 좌측 상단
- 우측 액션: 우측 상단 (선택)

---

### 2. HorizontalTabs

가로 스크롤 가능한 탭 네비게이션입니다.

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `tabs` | `string[]` | - | 탭 라벨 배열 |
| `activeIndex` | `number` | - | 활성 탭 인덱스 |
| `onChange` | `function` | - | 탭 변경 핸들러 |

#### 사용 예시

```jsx
const [activeTab, setActiveTab] = useState(0);

<HorizontalTabs
  tabs={['차량정보', '상차정보', '경유지', '하차정보', '부가정보']}
  activeIndex={activeTab}
  onChange={setActiveTab}
/>
```

#### 디자인 가이드라인
- 활성 탭: 파란색 텍스트 + 하단 border
- 비활성 탭: 회색 텍스트
- 가로 스크롤 가능
- 패딩: 좌우 20px, 상하 12px

---

### 3. ChipButton

단일 칩 스타일 버튼입니다.

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ReactNode` | - | 버튼 내용 |
| `selected` | `boolean` | `false` | 선택 상태 |
| `onClick` | `function` | - | 클릭 핸들러 |
| `disabled` | `boolean` | `false` | 비활성화 상태 |

#### 사용 예시

```jsx
<ChipButton 
  selected={temperature === '상온'}
  onClick={() => setTemperature('상온')}
>
  상온
</ChipButton>
```

---

### 4. ChipButtonGroup

칩 버튼 그리드 그룹입니다.

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `options` | `string[]` | - | 옵션 배열 |
| `value` | `string` \| `string[]` | - | 선택된 값 |
| `onChange` | `function` | - | 변경 핸들러 |
| `columns` | `number` | `3` | 그리드 열 개수 |
| `multiSelect` | `boolean` | `false` | 다중 선택 허용 |

#### 사용 예시

```jsx
// 단일 선택
<ChipButtonGroup
  options={['상온', '냉장', '냉동']}
  value={temperature}
  onChange={setTemperature}
  columns={3}
/>

// 다중 선택
<ChipButtonGroup
  options={['카고', '탑차', '윙바디', '무관']}
  value={vehicleTypes}
  onChange={setVehicleTypes}
  columns={4}
  multiSelect={true}
/>
```

#### 디자인 가이드라인
- **2열**: 큰 옵션 (아이콘 + 텍스트)
- **3열**: 중간 옵션 (상온/냉장/냉동)
- **4열**: 작은 옵션 (차량 유형, 톤수)
- 간격: 12px

---

### 5. MobileInput

모바일 최적화 입력 필드입니다.

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `type` | `string` | `'text'` | 입력 타입 |
| `placeholder` | `string` | - | 플레이스홀더 |
| `value` | `string` | - | 입력 값 |
| `onChange` | `function` | - | 변경 핸들러 |
| `disabled` | `boolean` | `false` | 비활성화 |
| `readOnly` | `boolean` | `false` | 읽기 전용 |
| `icon` | `ReactNode` | - | 좌측 아이콘 |

#### 사용 예시

```jsx
// 기본 입력
<MobileInput
  placeholder="회사명을 입력하세요"
  value={company}
  onChange={(e) => setCompany(e.target.value)}
/>

// 아이콘 포함
<MobileInput
  value={phone}
  icon={<Phone size={20} />}
  readOnly
/>

// 읽기 전용
<MobileInput
  value="인천시 부평구 부흥로 248"
  readOnly
/>
```

---

### 6. MobileDateTimePicker

네이티브 날짜/시간 선택기입니다.

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `type` | `'date'` \| `'time'` | `'date'` | 선택 타입 |
| `value` | `string` | - | 선택된 값 |
| `onChange` | `function` | - | 변경 핸들러 |
| `label` | `string` | - | 라벨 (선택) |

#### 사용 예시

```jsx
// 날짜 선택
<MobileDateTimePicker
  type="date"
  value={date}
  onChange={(e) => setDate(e.target.value)}
/>

// 시간 선택
<MobileDateTimePicker
  type="time"
  value={time}
  onChange={(e) => setTime(e.target.value)}
/>

// 2열 그리드
<div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
  <MobileDateTimePicker type="date" />
  <MobileDateTimePicker type="time" />
</div>
```

---

### 7. ContactChip

연락처 선택 칩입니다.

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `name` | `string` | - | 이름 |
| `phone` | `string` | - | 전화번호 (선택) |
| `selected` | `boolean` | `false` | 선택 상태 |
| `onClick` | `function` | - | 클릭 핸들러 |

#### 사용 예시

```jsx
const contacts = ['홍길동', '이순신', '김종서'];

<div style={{ display: 'flex', gap: '8px', overflowX: 'auto' }}>
  {contacts.map((name) => (
    <ContactChip
      key={name}
      name={name}
      selected={selectedContact === name}
      onClick={() => setSelectedContact(name)}
    />
  ))}
</div>
```

---

### 8. IconSelectButton

아이콘과 라벨이 있는 큰 선택 버튼입니다.

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `icon` | `ReactNode` | - | 아이콘 (이모지 또는 컴포넌트) |
| `label` | `string` | - | 라벨 텍스트 |
| `selected` | `boolean` | `false` | 선택 상태 |
| `onClick` | `function` | - | 클릭 핸들러 |

#### 사용 예시

```jsx
<div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
  <IconSelectButton
    icon="🚛"
    label="지게차"
    selected={method === '지게차'}
    onClick={() => setMethod('지게차')}
  />
  <IconSelectButton
    icon="👤"
    label="수작업"
    selected={method === '수작업'}
    onClick={() => setMethod('수작업')}
  />
</div>
```

#### 디자인 가이드라인
- 아이콘 크기: 48px
- 최소 높이: 120px
- 2열 그리드 권장

---

### 9. BottomFixedButton

화면 하단에 고정된 버튼입니다.

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ReactNode` | - | 버튼 텍스트 |
| `onClick` | `function` | - | 클릭 핸들러 |
| `disabled` | `boolean` | `false` | 비활성화 상태 |
| `variant` | `'primary'` \| `'secondary'` | `'primary'` | 버튼 스타일 |

#### 사용 예시

```jsx
<BottomFixedButton 
  onClick={handleNext}
  disabled={!isValid}
>
  다음
</BottomFixedButton>
```

#### 디자인 가이드라인
- 높이: 56px
- 전체 너비
- Safe Area 고려 (홈 인디케이터)
- 항상 화면 하단 고정

---

### 10. SectionHeader

섹션 헤더 with 액션 링크입니다.

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `label` | `string` | - | 섹션 라벨 |
| `required` | `boolean` | `false` | 필수 표시 |
| `action` | `string` | - | 액션 텍스트 |
| `onAction` | `function` | - | 액션 핸들러 |

#### 사용 예시

```jsx
<SectionHeader
  label="하차지 주소"
  required
  action="하차지 선택"
  onAction={() => openAddressSelector()}
/>
```

---

### 11. QuickSelectButtons

빠른 선택을 위한 수평 스크롤 버튼입니다.

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `options` | `string[]` | - | 옵션 배열 |
| `onSelect` | `function` | - | 선택 핸들러 |

#### 사용 예시

```jsx
<QuickSelectButtons
  options={['24시간 뒤', '48시간 뒤', '익일 오전']}
  onSelect={(option) => {
    if (option === '24시간 뒤') {
      setDate(addDays(new Date(), 1));
    }
  }}
/>
```

---

### 12. FavoriteLoadButton

즐겨찾기 불러오기 버튼입니다.

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `onClick` | `function` | - | 클릭 핸들러 |

#### 사용 예시

```jsx
<FavoriteLoadButton 
  onClick={() => openFavoriteModal()}
/>
```

---

## 📱 모바일 레이아웃 패턴

### 기본 화면 구조

```jsx
<div style={{ maxWidth: '428px', margin: '0 auto' }}>
  {/* Status Bar */}
  <div style={{ height: '44px' }}>
    {/* 시간, 배터리 등 */}
  </div>

  {/* Header */}
  <MobileHeader title="페이지 제목" onBack={goBack} />

  {/* Tabs (선택) */}
  <HorizontalTabs tabs={tabs} activeIndex={0} onChange={setTab} />

  {/* Scrollable Content */}
  <div style={{ 
    padding: '16px',
    paddingBottom: '100px' // 하단 버튼 공간
  }}>
    {/* 컨텐츠 */}
  </div>

  {/* Bottom Fixed Button */}
  <BottomFixedButton onClick={handleNext}>
    다음
  </BottomFixedButton>
</div>
```

---

## 🎨 디자인 토큰

### 색상
```javascript
primary: '#5A7CF0'    // 선택, 활성, 주요 액션
gray-300: '#D1D5DB'   // 비활성 테두리
gray-900: '#111827'   // 텍스트
white: '#FFFFFF'      // 배경
```

### 간격
```javascript
xs: '4px'    // 아주 작은 간격
sm: '8px'    // 작은 간격
md: '12px'   // 기본 간격
lg: '16px'   // 패딩, 마진
xl: '20px'   // 큰 간격
xxl: '24px'  // 섹션 간격
```

### 터치 영역
```javascript
최소: 44px
권장: 48px
큰 버튼: 56px
```

### Border Radius
```javascript
sm: '6px'    // 칩
md: '8px'    // 버튼, 입력
lg: '12px'   // 큰 버튼
xl: '16px'   // 모달
```

---

## 📏 반응형 가이드

### 화면 크기별 조정

```jsx
// 칩 버튼 그리드
// iPhone SE (375px): 3열
// iPhone 13 (390px): 3열
// iPhone Pro Max (428px): 4열

<ChipButtonGroup
  options={options}
  columns={width >= 400 ? 4 : 3}
/>
```

### Safe Area 대응

```jsx
// iOS Safe Area
paddingTop: 'env(safe-area-inset-top)'
paddingBottom: 'env(safe-area-inset-bottom)'
paddingLeft: 'env(safe-area-inset-left)'
paddingRight: 'env(safe-area-inset-right)'
```

---

## 💡 모바일 UX 팁

### 1. 입력 최소화
```jsx
// ❌ 나쁜 예: 직접 입력
<input type="text" placeholder="1톤, 1.4톤, 2.5톤..." />

// ✅ 좋은 예: 칩 버튼 선택
<ChipButtonGroup options={['1톤', '1.4톤', '2.5톤']} />
```

### 2. 빠른 선택 제공
```jsx
// ❌ 나쁜 예: 복잡한 날짜 계산
<DatePicker /> + <TimePicker />

// ✅ 좋은 예: 프리셋 + 피커
<QuickSelectButtons options={['24시간 뒤', '48시간 뒤']} />
<DatePicker />
```

### 3. 단계별 진행
```jsx
// ❌ 나쁜 예: 한 화면에 모든 입력
<Form>
  {/* 50개 필드 */}
</Form>

// ✅ 좋은 예: 탭으로 분할
<HorizontalTabs tabs={['기본정보', '상세정보', '추가정보']} />
```

### 4. 명확한 피드백
```jsx
// 터치 피드백
onTouchStart={(e) => {
  e.currentTarget.style.transform = 'scale(0.98)';
}}
onTouchEnd={(e) => {
  e.currentTarget.style.transform = 'scale(1)';
}}
```

---

## ✅ 모바일 체크리스트

### 개발 전
- [ ] 최소 터치 영역 44px 확인
- [ ] Safe Area 고려
- [ ] 가로/세로 모드 테스트
- [ ] 작은 화면 (iPhone SE) 테스트

### 개발 중
- [ ] 터치 피드백 구현
- [ ] 스크롤 영역 명확히 구분
- [ ] 키보드 올라올 때 레이아웃 확인
- [ ] 로딩 상태 표시

### 개발 후
- [ ] 실제 디바이스 테스트
- [ ] 네트워크 느릴 때 테스트
- [ ] 한손 조작 가능성 확인
- [ ] 접근성 (VoiceOver) 테스트

---

## 🎯 성능 최적화

### 1. 가상 스크롤
```jsx
// 긴 리스트는 가상 스크롤 사용
import { FixedSizeList } from 'react-window';
```

### 2. 이미지 최적화
```jsx
// WebP 포맷, 적절한 크기
<img src="image.webp" loading="lazy" />
```

### 3. 터치 이벤트 최적화
```jsx
// Passive event listeners
element.addEventListener('touchstart', handler, { passive: true });
```

---

**버전**: 모바일 v1.0  
**최종 업데이트**: 2026-01-23  
**작성자**: AJ네트웍스 모바일 디자인팀
