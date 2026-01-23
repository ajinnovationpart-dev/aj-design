import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Calendar, Clock, Phone, Star, Plus } from 'lucide-react';

/**
 * AJ네트웍스 모바일 디자인 시스템
 * 터치 최적화된 모바일 전용 컴포넌트 라이브러리
 */

// ========== 모바일 디자인 토큰 ==========
const mobileColors = {
  primary: '#5A7CF0',
  brand: '#E31E24',
  gray: {
    50: '#F9FAFB',
    100: '#F3F4F6',
    200: '#E5E7EB',
    300: '#D1D5DB',
    400: '#9CA3AF',
    500: '#6B7280',
    600: '#4B5563',
    700: '#374151',
    800: '#1F2937',
    900: '#111827',
  },
  white: '#FFFFFF',
};

const mobileSpacing = {
  xs: '4px',
  sm: '8px',
  md: '12px',
  lg: '16px',
  xl: '20px',
  xxl: '24px',
};

const mobileBorderRadius = {
  sm: '6px',
  md: '8px',
  lg: '12px',
  xl: '16px',
};

// ========== 1. MobileHeader (모바일 헤더) ==========
const MobileHeader = ({ title, onBack, rightAction }) => {
  const headerStyle = {
    position: 'sticky',
    top: 0,
    left: 0,
    right: 0,
    height: '56px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: `0 ${mobileSpacing.lg}`,
    backgroundColor: mobileColors.white,
    borderBottom: `1px solid ${mobileColors.gray[200]}`,
    zIndex: 100,
    fontFamily: '-apple-system, BlinkMacSystemFont, "Malgun Gothic", "맑은 고딕", sans-serif',
  };

  const backButtonStyle = {
    background: 'none',
    border: 'none',
    padding: mobileSpacing.sm,
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
    color: mobileColors.gray[900],
  };

  const titleStyle = {
    fontSize: '18px',
    fontWeight: '600',
    color: mobileColors.gray[900],
    position: 'absolute',
    left: '50%',
    transform: 'translateX(-50%)',
  };

  return (
    <header style={headerStyle}>
      <button style={backButtonStyle} onClick={onBack}>
        <ChevronLeft size={24} />
      </button>
      <h1 style={titleStyle}>{title}</h1>
      {rightAction && <div>{rightAction}</div>}
    </header>
  );
};

// ========== 2. HorizontalTabs (가로 스크롤 탭) ==========
const HorizontalTabs = ({ tabs, activeIndex, onChange }) => {
  const containerStyle = {
    display: 'flex',
    overflowX: 'auto',
    borderBottom: `1px solid ${mobileColors.gray[200]}`,
    backgroundColor: mobileColors.white,
    WebkitOverflowScrolling: 'touch',
    scrollbarWidth: 'none',
    msOverflowStyle: 'none',
  };

  const tabStyle = (isActive) => ({
    flex: '0 0 auto',
    padding: `${mobileSpacing.md} ${mobileSpacing.xl}`,
    fontSize: '15px',
    fontWeight: isActive ? '600' : '400',
    color: isActive ? mobileColors.primary : mobileColors.gray[600],
    borderBottom: `2px solid ${isActive ? mobileColors.primary : 'transparent'}`,
    cursor: 'pointer',
    whiteSpace: 'nowrap',
    background: 'none',
    border: 'none',
    borderBottom: `2px solid ${isActive ? mobileColors.primary : 'transparent'}`,
    fontFamily: '-apple-system, BlinkMacSystemFont, "Malgun Gothic", "맑은 고딕", sans-serif',
    transition: 'all 0.2s ease',
  });

  return (
    <>
      <style>{`
        .horizontal-tabs::-webkit-scrollbar {
          display: none;
        }
      `}</style>
      <div className="horizontal-tabs" style={containerStyle}>
        {tabs.map((tab, index) => (
          <button
            key={index}
            style={tabStyle(index === activeIndex)}
            onClick={() => onChange(index)}
          >
            {tab}
          </button>
        ))}
      </div>
    </>
  );
};

// ========== 3. ChipButton (칩 버튼) ==========
const ChipButton = ({ children, selected = false, onClick, disabled = false }) => {
  const buttonStyle = {
    padding: `${mobileSpacing.md} ${mobileSpacing.lg}`,
    minHeight: '48px',
    border: `1px solid ${selected ? mobileColors.primary : mobileColors.gray[300]}`,
    borderRadius: mobileBorderRadius.md,
    backgroundColor: mobileColors.white,
    color: selected ? mobileColors.primary : mobileColors.gray[900],
    fontSize: '15px',
    fontWeight: selected ? '600' : '400',
    cursor: disabled ? 'not-allowed' : 'pointer',
    opacity: disabled ? 0.5 : 1,
    transition: 'all 0.2s ease',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Malgun Gothic", "맑은 고딕", sans-serif',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    WebkitTapHighlightColor: 'transparent',
  };

  return (
    <button
      style={buttonStyle}
      onClick={onClick}
      disabled={disabled}
      onTouchStart={(e) => {
        if (!selected) {
          e.currentTarget.style.backgroundColor = mobileColors.gray[50];
        }
      }}
      onTouchEnd={(e) => {
        if (!selected) {
          e.currentTarget.style.backgroundColor = mobileColors.white;
        }
      }}
    >
      {children}
    </button>
  );
};

// ========== 4. ChipButtonGroup (칩 버튼 그룹) ==========
const ChipButtonGroup = ({ 
  options, 
  value, 
  onChange, 
  columns = 3,
  multiSelect = false 
}) => {
  const [selectedValues, setSelectedValues] = useState(
    multiSelect ? (Array.isArray(value) ? value : []) : value
  );

  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: `repeat(${columns}, 1fr)`,
    gap: mobileSpacing.md,
  };

  const handleClick = (option) => {
    if (multiSelect) {
      const newValues = selectedValues.includes(option)
        ? selectedValues.filter(v => v !== option)
        : [...selectedValues, option];
      setSelectedValues(newValues);
      if (onChange) onChange(newValues);
    } else {
      setSelectedValues(option);
      if (onChange) onChange(option);
    }
  };

  const isSelected = (option) => {
    if (multiSelect) {
      return selectedValues.includes(option);
    }
    return selectedValues === option;
  };

  return (
    <div style={gridStyle}>
      {options.map((option, index) => (
        <ChipButton
          key={index}
          selected={isSelected(option)}
          onClick={() => handleClick(option)}
        >
          {option}
        </ChipButton>
      ))}
    </div>
  );
};

// ========== 5. MobileInput (모바일 입력 필드) ==========
const MobileInput = ({ 
  type = 'text',
  placeholder,
  value,
  onChange,
  disabled = false,
  readOnly = false,
  icon,
  ...props 
}) => {
  const containerStyle = {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
  };

  const inputStyle = {
    width: '100%',
    minHeight: '48px',
    padding: icon ? `0 ${mobileSpacing.lg} 0 48px` : `0 ${mobileSpacing.lg}`,
    fontSize: '15px',
    border: `1px solid ${mobileColors.gray[300]}`,
    borderRadius: mobileBorderRadius.md,
    backgroundColor: disabled ? mobileColors.gray[50] : mobileColors.white,
    color: mobileColors.gray[900],
    fontFamily: '-apple-system, BlinkMacSystemFont, "Malgun Gothic", "맑은 고딕", sans-serif',
    outline: 'none',
    WebkitAppearance: 'none',
    transition: 'border-color 0.2s ease',
  };

  const iconStyle = {
    position: 'absolute',
    left: mobileSpacing.lg,
    color: mobileColors.gray[400],
    pointerEvents: 'none',
  };

  return (
    <div style={containerStyle}>
      {icon && <div style={iconStyle}>{icon}</div>}
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        disabled={disabled}
        readOnly={readOnly}
        style={inputStyle}
        onFocus={(e) => {
          e.target.style.borderColor = mobileColors.primary;
        }}
        onBlur={(e) => {
          e.target.style.borderColor = mobileColors.gray[300];
        }}
        {...props}
      />
    </div>
  );
};

// ========== 6. MobileDateTimePicker (날짜/시간 선택) ==========
const MobileDateTimePicker = ({ 
  type = 'date', // 'date' or 'time'
  value,
  onChange,
  label,
}) => {
  const icon = type === 'date' ? <Calendar size={20} /> : <Clock size={20} />;

  const containerStyle = {
    display: 'flex',
    alignItems: 'center',
    minHeight: '48px',
    padding: `0 ${mobileSpacing.lg}`,
    border: `1px solid ${mobileColors.gray[300]}`,
    borderRadius: mobileBorderRadius.md,
    backgroundColor: mobileColors.white,
    cursor: 'pointer',
  };

  const iconWrapperStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: mobileSpacing.md,
    color: mobileColors.gray[400],
  };

  const inputStyle = {
    flex: 1,
    border: 'none',
    outline: 'none',
    fontSize: '15px',
    color: mobileColors.gray[900],
    backgroundColor: 'transparent',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Malgun Gothic", "맑은 고딕", sans-serif',
  };

  return (
    <div style={containerStyle}>
      <div style={iconWrapperStyle}>{icon}</div>
      <input
        type={type}
        value={value}
        onChange={onChange}
        style={inputStyle}
      />
    </div>
  );
};

// ========== 7. ContactChip (연락처 칩) ==========
const ContactChip = ({ name, phone, selected = false, onClick }) => {
  const chipStyle = {
    padding: `${mobileSpacing.sm} ${mobileSpacing.lg}`,
    border: `1px solid ${selected ? mobileColors.primary : mobileColors.gray[300]}`,
    borderRadius: mobileBorderRadius.md,
    backgroundColor: mobileColors.white,
    color: selected ? mobileColors.primary : mobileColors.gray[900],
    fontSize: '14px',
    fontWeight: selected ? '600' : '400',
    cursor: 'pointer',
    whiteSpace: 'nowrap',
    display: 'inline-flex',
    alignItems: 'center',
    gap: mobileSpacing.xs,
    fontFamily: '-apple-system, BlinkMacSystemFont, "Malgun Gothic", "맑은 고딕", sans-serif',
    transition: 'all 0.2s ease',
  };

  return (
    <button style={chipStyle} onClick={onClick}>
      {name}
    </button>
  );
};

// ========== 8. IconSelectButton (아이콘 선택 버튼) ==========
const IconSelectButton = ({ icon, label, selected = false, onClick }) => {
  const buttonStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '120px',
    padding: mobileSpacing.lg,
    border: `2px solid ${selected ? mobileColors.primary : mobileColors.gray[300]}`,
    borderRadius: mobileBorderRadius.lg,
    backgroundColor: mobileColors.white,
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Malgun Gothic", "맑은 고딕", sans-serif',
  };

  const iconStyle = {
    fontSize: '48px',
    marginBottom: mobileSpacing.md,
    color: selected ? mobileColors.primary : mobileColors.gray[600],
  };

  const labelStyle = {
    fontSize: '16px',
    fontWeight: selected ? '600' : '400',
    color: selected ? mobileColors.primary : mobileColors.gray[900],
  };

  return (
    <button style={buttonStyle} onClick={onClick}>
      <div style={iconStyle}>{icon}</div>
      <div style={labelStyle}>{label}</div>
    </button>
  );
};

// ========== 9. BottomFixedButton (하단 고정 버튼) ==========
const BottomFixedButton = ({ 
  children, 
  onClick, 
  disabled = false,
  variant = 'primary' 
}) => {
  const containerStyle = {
    position: 'fixed',
    bottom: 0,
    left: 0,
    right: 0,
    padding: mobileSpacing.lg,
    paddingBottom: `calc(${mobileSpacing.lg} + env(safe-area-inset-bottom))`,
    backgroundColor: mobileColors.white,
    borderTop: `1px solid ${mobileColors.gray[200]}`,
    zIndex: 100,
  };

  const buttonStyle = {
    width: '100%',
    height: '56px',
    border: 'none',
    borderRadius: mobileBorderRadius.lg,
    backgroundColor: disabled ? mobileColors.gray[300] : mobileColors.primary,
    color: mobileColors.white,
    fontSize: '16px',
    fontWeight: '600',
    cursor: disabled ? 'not-allowed' : 'pointer',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Malgun Gothic", "맑은 고딕", sans-serif',
    transition: 'all 0.2s ease',
  };

  return (
    <div style={containerStyle}>
      <button
        style={buttonStyle}
        onClick={onClick}
        disabled={disabled}
        onTouchStart={(e) => {
          if (!disabled) {
            e.currentTarget.style.transform = 'scale(0.98)';
          }
        }}
        onTouchEnd={(e) => {
          if (!disabled) {
            e.currentTarget.style.transform = 'scale(1)';
          }
        }}
      >
        {children}
      </button>
    </div>
  );
};

// ========== 10. SectionHeader (섹션 헤더) ==========
const SectionHeader = ({ 
  label, 
  required = false, 
  action, 
  onAction 
}) => {
  const headerStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: mobileSpacing.md,
  };

  const labelStyle = {
    fontSize: '15px',
    fontWeight: '600',
    color: mobileColors.gray[900],
    fontFamily: '-apple-system, BlinkMacSystemFont, "Malgun Gothic", "맑은 고딕", sans-serif',
  };

  const requiredStyle = {
    color: mobileColors.primary,
    marginLeft: '2px',
  };

  const actionStyle = {
    fontSize: '14px',
    color: mobileColors.primary,
    cursor: 'pointer',
    background: 'none',
    border: 'none',
    padding: 0,
    fontFamily: '-apple-system, BlinkMacSystemFont, "Malgun Gothic", "맑은 고딕", sans-serif',
  };

  return (
    <div style={headerStyle}>
      <div style={labelStyle}>
        {label}
        {required && <span style={requiredStyle}> *</span>}
      </div>
      {action && (
        <button style={actionStyle} onClick={onAction}>
          {action} <ChevronRight size={14} style={{ verticalAlign: 'middle' }} />
        </button>
      )}
    </div>
  );
};

// ========== 11. QuickSelectButtons (빠른 선택 버튼) ==========
const QuickSelectButtons = ({ options, onSelect }) => {
  const containerStyle = {
    display: 'flex',
    gap: mobileSpacing.sm,
    overflowX: 'auto',
    WebkitOverflowScrolling: 'touch',
    scrollbarWidth: 'none',
    msOverflowStyle: 'none',
  };

  const buttonStyle = {
    flex: '0 0 auto',
    padding: `${mobileSpacing.sm} ${mobileSpacing.lg}`,
    border: `1px solid ${mobileColors.gray[300]}`,
    borderRadius: mobileBorderRadius.md,
    backgroundColor: mobileColors.white,
    fontSize: '14px',
    color: mobileColors.gray[700],
    cursor: 'pointer',
    whiteSpace: 'nowrap',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Malgun Gothic", "맑은 고딕", sans-serif',
  };

  return (
    <>
      <style>{`
        .quick-select::-webkit-scrollbar {
          display: none;
        }
      `}</style>
      <div className="quick-select" style={containerStyle}>
        {options.map((option, index) => (
          <button
            key={index}
            style={buttonStyle}
            onClick={() => onSelect(option)}
          >
            {option}
          </button>
        ))}
      </div>
    </>
  );
};

// ========== 12. FavoriteLoadButton (즐겨찾기 불러오기) ==========
const FavoriteLoadButton = ({ onClick }) => {
  const buttonStyle = {
    width: '100%',
    padding: mobileSpacing.lg,
    border: `1px dashed ${mobileColors.primary}`,
    borderRadius: mobileBorderRadius.md,
    backgroundColor: mobileColors.white,
    color: mobileColors.primary,
    fontSize: '15px',
    fontWeight: '500',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: mobileSpacing.sm,
    fontFamily: '-apple-system, BlinkMacSystemFont, "Malgun Gothic", "맑은 고딕", sans-serif',
    transition: 'all 0.2s ease',
  };

  return (
    <button style={buttonStyle} onClick={onClick}>
      <Plus size={20} />
      즐겨찾기 불러오기
    </button>
  );
};

// ========== 데모 애플리케이션 ==========
export default function AJNetworksMobileDesignSystem() {
  const [activeTab, setActiveTab] = useState(3); // 하차정보
  const [temperature, setTemperature] = useState('상온');
  const [vehicleType, setVehicleType] = useState([]);
  const [tonnage, setTonnage] = useState('1톤');
  const [service, setService] = useState([]);
  const [vehicles, setVehicles] = useState('1대');
  const [unloadDate, setUnloadDate] = useState('2023-08-01');
  const [unloadTime, setUnloadTime] = useState('16:00');
  const [selectedContact, setSelectedContact] = useState('홍길동');
  const [loadMethod, setLoadMethod] = useState('지게차');

  const tabs = ['차량정보', '상차정보', '경유지', '하차정보', '부가정보'];
  const temperatureOptions = ['상온', '냉장', '냉동'];
  const vehicleTypeOptions = ['카고', '탑차', '윙바디', '무관'];
  const tonnageOptions = ['1톤', '1.4톤', '2.5톤', '3.5톤', '5톤', '5톤축', '11톤', '18톤', '25톤', '라보', '다마스'];
  const serviceOptions = ['편도', '왕복'];
  const vehicleOptions = ['1대', '2대', '3대', '4대', '5대', '6대'];
  const contacts = ['홍길동', '이순신', '김종서'];

  return (
    <div style={{
      position: 'relative',
      maxWidth: '428px',
      margin: '0 auto',
      minHeight: '100vh',
      backgroundColor: mobileColors.white,
      fontFamily: '-apple-system, BlinkMacSystemFont, "Malgun Gothic", "맑은 고딕", sans-serif',
    }}>
      {/* Status Bar 시뮬레이션 */}
      <div style={{
        height: '44px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: `0 ${mobileSpacing.lg}`,
        fontSize: '15px',
        fontWeight: '600',
      }}>
        <span>9:41</span>
        <div style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
          <div>📶</div>
          <div>📡</div>
          <div>🔋</div>
        </div>
      </div>

      {/* Header */}
      <MobileHeader
        title="운송신청"
        onBack={() => console.log('뒤로가기')}
      />

      {/* Tabs */}
      <HorizontalTabs
        tabs={tabs}
        activeIndex={activeTab}
        onChange={setActiveTab}
      />

      {/* Content */}
      <div style={{
        padding: mobileSpacing.lg,
        paddingBottom: '100px', // 하단 버튼 공간
      }}>
        {activeTab === 0 && (
          // 차량정보 탭
          <>
            <FavoriteLoadButton onClick={() => console.log('즐겨찾기')} />
            
            <div style={{ marginTop: mobileSpacing.xxl }}>
              <SectionHeader label="온도 구분" required />
              <ChipButtonGroup
                options={temperatureOptions}
                value={temperature}
                onChange={setTemperature}
                columns={3}
              />
            </div>

            <div style={{ marginTop: mobileSpacing.xxl }}>
              <SectionHeader label="차량 유형" required />
              <ChipButtonGroup
                options={vehicleTypeOptions}
                value={vehicleType}
                onChange={setVehicleType}
                columns={4}
                multiSelect
              />
            </div>

            <div style={{ marginTop: mobileSpacing.xxl }}>
              <SectionHeader label="파렛트" required />
              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: mobileSpacing.md,
              }}>
                <select style={{
                  minHeight: '48px',
                  padding: `0 ${mobileSpacing.lg}`,
                  border: `1px solid ${mobileColors.gray[300]}`,
                  borderRadius: mobileBorderRadius.md,
                  fontSize: '15px',
                  backgroundColor: mobileColors.white,
                }}>
                  <option>수량 선택</option>
                </select>
                <select style={{
                  minHeight: '48px',
                  padding: `0 ${mobileSpacing.lg}`,
                  border: `1px solid ${mobileColors.gray[300]}`,
                  borderRadius: mobileBorderRadius.md,
                  fontSize: '15px',
                  backgroundColor: mobileColors.white,
                }}>
                  <option>유형 선택</option>
                </select>
              </div>
            </div>

            <div style={{ marginTop: mobileSpacing.xxl }}>
              <SectionHeader label="차량 톤수" required action="초저가능" />
              <ChipButtonGroup
                options={tonnageOptions}
                value={tonnage}
                onChange={setTonnage}
                columns={4}
              />
            </div>

            <div style={{ marginTop: mobileSpacing.xxl }}>
              <SectionHeader label="서비스 선택" required />
              <ChipButtonGroup
                options={serviceOptions}
                value={service}
                onChange={setService}
                columns={2}
                multiSelect
              />
            </div>

            <div style={{ marginTop: mobileSpacing.xxl }}>
              <SectionHeader label="차량대수" required />
              <ChipButtonGroup
                options={vehicleOptions}
                value={vehicles}
                onChange={setVehicles}
                columns={4}
              />
            </div>
          </>
        )}

        {activeTab === 3 && (
          // 하차정보 탭
          <>
            <div>
              <SectionHeader label="하차 날짜 및 시간" required />
              <QuickSelectButtons
                options={['24시간 뒤', '48시간 뒤', '익일 오전']}
                onSelect={(option) => console.log(option)}
              />
              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: mobileSpacing.md,
                marginTop: mobileSpacing.md,
              }}>
                <MobileDateTimePicker
                  type="date"
                  value={unloadDate}
                  onChange={(e) => setUnloadDate(e.target.value)}
                />
                <MobileDateTimePicker
                  type="time"
                  value={unloadTime}
                  onChange={(e) => setUnloadTime(e.target.value)}
                />
              </div>
            </div>

            <div style={{ marginTop: mobileSpacing.xxl }}>
              <SectionHeader label="하차지 주소" required action="하차지 선택" />
              <div style={{
                display: 'flex',
                gap: mobileSpacing.sm,
                marginBottom: mobileSpacing.md,
              }}>
                <ChipButton selected>정문</ChipButton>
                <ChipButton>제1공장</ChipButton>
                <ChipButton>제2공장</ChipButton>
              </div>
              <MobileInput
                value="안녕물류"
                readOnly
                style={{ marginBottom: mobileSpacing.sm }}
              />
              <MobileInput
                value="인천시 부평구 부흥로 248"
                readOnly
              />
            </div>

            <div style={{ marginTop: mobileSpacing.xxl }}>
              <SectionHeader label="하차지 담당" required action="연락처 선택" />
              <div style={{
                display: 'flex',
                gap: mobileSpacing.sm,
                marginBottom: mobileSpacing.md,
                overflowX: 'auto',
              }}>
                {contacts.map((name) => (
                  <ContactChip
                    key={name}
                    name={name}
                    selected={selectedContact === name}
                    onClick={() => setSelectedContact(name)}
                  />
                ))}
              </div>
              <MobileInput
                value="010-8697-9823"
                icon={<Phone size={20} />}
                readOnly
              />
            </div>

            <div style={{ marginTop: mobileSpacing.xxl }}>
              <SectionHeader label="상차 방법" required />
              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: mobileSpacing.md,
              }}>
                <IconSelectButton
                  icon="🚛"
                  label="지게차"
                  selected={loadMethod === '지게차'}
                  onClick={() => setLoadMethod('지게차')}
                />
                <IconSelectButton
                  icon="👤"
                  label="수작업"
                  selected={loadMethod === '수작업'}
                  onClick={() => setLoadMethod('수작업')}
                />
              </div>
            </div>
          </>
        )}
      </div>

      {/* Bottom Fixed Button */}
      <BottomFixedButton onClick={() => console.log('다음')}>
        다음
      </BottomFixedButton>
    </div>
  );
}
