import React, { useState } from 'react';
import { X, Search, Star, ChevronDown, Check, Calendar as CalendarIcon, Clock, ChevronLeft, ChevronRight, Plus, Download, FileText, TrendingUp, DollarSign } from 'lucide-react';

/**
 * AJ네트웍스 디자인 시스템 v3.0 - 완전판
 * Phase 2 컴포넌트 추가: SummaryCard, ListModal, FilterSection, EmptyState
 */

// [디자인 토큰 및 기존 컴포넌트 1-17 생략 - 동일]

const colors = {
  primary: '#5A7CF0',
  brand: '#E31E24',
  dark: '#3F4654',
  error: '#FF4D4F',
  success: '#10B981',
  warning: '#F59E0B',
  info: '#3B82F6',
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

const spacing = {
  xs: '4px',
  sm: '8px',
  md: '12px',
  lg: '16px',
  xl: '24px',
  xxl: '32px',
};

const borderRadius = {
  sm: '4px',
  md: '6px',
  lg: '8px',
};

// ========== Phase 2: 추가 컴포넌트 ==========

// ========== 18. SummaryCard (통계 카드) ==========
const SummaryCard = ({ 
  title, 
  value, 
  unit = '원',
  trend,
  trendValue,
  color = 'primary',
  icon: Icon,
}) => {
  const colorMap = {
    primary: colors.primary,
    brand: colors.brand,
    success: colors.success,
    warning: colors.warning,
    info: colors.info,
  };

  const cardStyle = {
    backgroundColor: colors.white,
    border: `1px solid ${colors.gray[200]}`,
    borderRadius: borderRadius.lg,
    padding: spacing.xl,
    display: 'flex',
    flexDirection: 'column',
    gap: spacing.sm,
    minWidth: '200px',
    transition: 'all 0.2s ease',
  };

  const titleStyle = {
    fontSize: '13px',
    fontWeight: '500',
    color: colors.gray[600],
    fontFamily: '-apple-system, BlinkMacSystemFont, "Malgun Gothic", "맑은 고딕", sans-serif',
  };

  const valueContainerStyle = {
    display: 'flex',
    alignItems: 'baseline',
    gap: spacing.xs,
  };

  const valueStyle = {
    fontSize: '24px',
    fontWeight: '700',
    color: colorMap[color] || colors.gray[900],
    fontFamily: '-apple-system, BlinkMacSystemFont, "Malgun Gothic", "맑은 고딕", sans-serif',
  };

  const unitStyle = {
    fontSize: '14px',
    fontWeight: '500',
    color: colors.gray[500],
    fontFamily: '-apple-system, BlinkMacSystemFont, "Malgun Gothic", "맑은 고딕", sans-serif',
  };

  const trendStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: spacing.xs,
    fontSize: '12px',
    color: trend === 'up' ? colors.success : trend === 'down' ? colors.error : colors.gray[500],
    fontFamily: '-apple-system, BlinkMacSystemFont, "Malgun Gothic", "맑은 고딕", sans-serif',
  };

  return (
    <div 
      style={cardStyle}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
        e.currentTarget.style.transform = 'translateY(-2px)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = 'none';
        e.currentTarget.style.transform = 'translateY(0)';
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <span style={titleStyle}>{title}</span>
        {Icon && <Icon size={20} color={colorMap[color]} />}
      </div>
      <div style={valueContainerStyle}>
        <span style={valueStyle}>
          {typeof value === 'number' ? value.toLocaleString() : value}
        </span>
        <span style={unitStyle}>{unit}</span>
      </div>
      {trendValue && (
        <div style={trendStyle}>
          <TrendingUp size={14} />
          <span>{trendValue}</span>
        </div>
      )}
    </div>
  );
};

// ========== 19. ListModal (리스트 선택 모달) ==========
const ListModal = ({ 
  isOpen,
  onClose,
  title,
  items = [],
  onSelect,
  favoritable = true,
  pinnedable = true,
  searchable = true,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [favorites, setFavorites] = useState(new Set());
  const [pinned, setPinned] = useState(new Set());

  if (!isOpen) return null;

  const filteredItems = items.filter(item => 
    item.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.phone?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleFavorite = (id) => {
    const newFavorites = new Set(favorites);
    if (newFavorites.has(id)) {
      newFavorites.delete(id);
    } else {
      newFavorites.add(id);
    }
    setFavorites(newFavorites);
  };

  const togglePin = (id) => {
    const newPinned = new Set(pinned);
    if (newPinned.has(id)) {
      newPinned.delete(id);
    } else {
      newPinned.add(id);
    }
    setPinned(newPinned);
  };

  const modalContentStyle = {
    backgroundColor: colors.white,
    borderRadius: borderRadius.lg,
    width: '600px',
    maxWidth: '90vw',
    maxHeight: '80vh',
    display: 'flex',
    flexDirection: 'column',
  };

  const headerStyle = {
    padding: spacing.xl,
    borderBottom: `1px solid ${colors.gray[200]}`,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  };

  const listContainerStyle = {
    flex: 1,
    overflowY: 'auto',
    padding: spacing.lg,
  };

  const listItemStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: spacing.md,
    borderBottom: `1px solid ${colors.gray[200]}`,
    transition: 'background-color 0.2s',
  };

  return (
    <>
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
      }} onClick={onClose}>
        <div style={modalContentStyle} onClick={(e) => e.stopPropagation()}>
          <div style={headerStyle}>
            <h2 style={{
              fontSize: '18px',
              fontWeight: '600',
              color: colors.gray[900],
              margin: 0,
              fontFamily: '-apple-system, BlinkMacSystemFont, "Malgun Gothic", "맑은 고딕", sans-serif',
            }}>
              {title}
            </h2>
            <button
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: spacing.xs,
                display: 'flex',
              }}
              onClick={onClose}
            >
              <X size={20} color={colors.gray[500]} />
            </button>
          </div>

          {searchable && (
            <div style={{ padding: spacing.lg, borderBottom: `1px solid ${colors.gray[200]}` }}>
              <div style={{ position: 'relative' }}>
                <Search size={16} color={colors.gray[400]} style={{
                  position: 'absolute',
                  left: spacing.md,
                  top: '50%',
                  transform: 'translateY(-50%)',
                }} />
                <input
                  type="text"
                  placeholder="검색"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  style={{
                    width: '100%',
                    height: '40px',
                    paddingLeft: '40px',
                    paddingRight: spacing.md,
                    border: `1px solid ${colors.gray[300]}`,
                    borderRadius: borderRadius.md,
                    fontSize: '14px',
                    outline: 'none',
                    fontFamily: '-apple-system, BlinkMacSystemFont, "Malgun Gothic", "맑은 고딕", sans-serif',
                  }}
                />
              </div>
            </div>
          )}

          <div style={listContainerStyle}>
            {filteredItems.map((item) => (
              <div
                key={item.id}
                style={listItemStyle}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = colors.gray[50]}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: spacing.md, flex: 1 }}>
                  {favoritable && (
                    <button
                      style={{
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        padding: spacing.xs,
                      }}
                      onClick={() => toggleFavorite(item.id)}
                    >
                      <Star
                        size={16}
                        fill={favorites.has(item.id) ? '#FCD34D' : 'none'}
                        color={favorites.has(item.id) ? '#FCD34D' : colors.gray[400]}
                      />
                    </button>
                  )}
                  <div>
                    <div style={{
                      fontSize: '14px',
                      fontWeight: '500',
                      color: colors.gray[900],
                      fontFamily: '-apple-system, BlinkMacSystemFont, "Malgun Gothic", "맑은 고딕", sans-serif',
                    }}>
                      {item.name}
                    </div>
                    {item.phone && (
                      <div style={{
                        fontSize: '12px',
                        color: colors.gray[500],
                        fontFamily: '-apple-system, BlinkMacSystemFont, "Malgun Gothic", "맑은 고딕", sans-serif',
                      }}>
                        {item.phone}
                      </div>
                    )}
                  </div>
                </div>
                <div style={{ display: 'flex', gap: spacing.sm }}>
                  {pinnedable && (
                    <button
                      style={{
                        padding: `${spacing.xs} ${spacing.md}`,
                        border: `1px solid ${colors.gray[300]}`,
                        borderRadius: borderRadius.sm,
                        backgroundColor: colors.white,
                        fontSize: '13px',
                        cursor: 'pointer',
                        fontFamily: '-apple-system, BlinkMacSystemFont, "Malgun Gothic", "맑은 고딕", sans-serif',
                      }}
                      onClick={() => togglePin(item.id)}
                    >
                      {pinned.has(item.id) ? '고정해제' : '고정하기'}
                    </button>
                  )}
                  <button
                    style={{
                      padding: `${spacing.xs} ${spacing.md}`,
                      border: `1px solid ${colors.primary}`,
                      borderRadius: borderRadius.sm,
                      backgroundColor: colors.white,
                      color: colors.primary,
                      fontSize: '13px',
                      cursor: 'pointer',
                      fontFamily: '-apple-system, BlinkMacSystemFont, "Malgun Gothic", "맑은 고딕", sans-serif',
                    }}
                    onClick={() => onSelect(item)}
                  >
                    선택
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

// ========== 20. EmptyState (빈 상태) ==========
const EmptyState = ({ 
  icon: Icon = FileText,
  message = '데이터가 없습니다',
  description,
  action,
  actionLabel,
}) => {
  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.xxl,
    minHeight: '300px',
    color: colors.gray[500],
    fontFamily: '-apple-system, BlinkMacSystemFont, "Malgun Gothic", "맑은 고딕", sans-serif',
  };

  const iconContainerStyle = {
    width: '64px',
    height: '64px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.gray[100],
    borderRadius: '50%',
    marginBottom: spacing.lg,
  };

  const messageStyle = {
    fontSize: '16px',
    fontWeight: '500',
    color: colors.gray[700],
    marginBottom: spacing.sm,
  };

  const descriptionStyle = {
    fontSize: '14px',
    color: colors.gray[500],
    textAlign: 'center',
    marginBottom: spacing.xl,
  };

  return (
    <div style={containerStyle}>
      <div style={iconContainerStyle}>
        <Icon size={32} color={colors.gray[400]} />
      </div>
      <div style={messageStyle}>{message}</div>
      {description && <div style={descriptionStyle}>{description}</div>}
      {action && actionLabel && (
        <button
          onClick={action}
          style={{
            padding: `${spacing.md} ${spacing.xl}`,
            backgroundColor: colors.primary,
            color: colors.white,
            border: 'none',
            borderRadius: borderRadius.md,
            fontSize: '14px',
            fontWeight: '500',
            cursor: 'pointer',
            fontFamily: '-apple-system, BlinkMacSystemFont, "Malgun Gothic", "맑은 고딕", sans-serif',
          }}
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
};

// ========== 21. FilterSection (필터 영역) ==========
const FilterSection = ({ children, onSearch, onReset }) => {
  const containerStyle = {
    backgroundColor: colors.gray[50],
    border: `1px solid ${colors.gray[200]}`,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    marginBottom: spacing.xl,
  };

  const rowStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: spacing.md,
    marginBottom: spacing.md,
  };

  const buttonGroupStyle = {
    display: 'flex',
    gap: spacing.sm,
    justifyContent: 'flex-end',
  };

  return (
    <div style={containerStyle}>
      <div style={rowStyle}>
        {children}
      </div>
      {(onSearch || onReset) && (
        <div style={buttonGroupStyle}>
          {onReset && (
            <button
              onClick={onReset}
              style={{
                padding: `${spacing.md} ${spacing.xl}`,
                backgroundColor: colors.white,
                color: colors.gray[700],
                border: `1px solid ${colors.gray[300]}`,
                borderRadius: borderRadius.md,
                fontSize: '14px',
                fontWeight: '500',
                cursor: 'pointer',
                fontFamily: '-apple-system, BlinkMacSystemFont, "Malgun Gothic", "맑은 고딕", sans-serif',
              }}
            >
              초기화
            </button>
          )}
          {onSearch && (
            <button
              onClick={onSearch}
              style={{
                padding: `${spacing.md} ${spacing.xl}`,
                backgroundColor: colors.primary,
                color: colors.white,
                border: 'none',
                borderRadius: borderRadius.md,
                fontSize: '14px',
                fontWeight: '500',
                cursor: 'pointer',
                fontFamily: '-apple-system, BlinkMacSystemFont, "Malgun Gothic", "맑은 고딕", sans-serif',
              }}
            >
              검색
            </button>
          )}
        </div>
      )}
    </div>
  );
};

// ========== 데모 애플리케이션 v3.0 ==========
export default function AJNetworksDesignSystemV3() {
  const [listModalOpen, setListModalOpen] = useState(false);

  const mockCarriers = [
    { id: 1, name: '홍길동', phone: '010-1234-5678' },
    { id: 2, name: '유재석', phone: '010-2345-6789' },
    { id: 3, name: '양세찬', phone: '010-3456-7890' },
    { id: 4, name: '김호중', phone: '010-4567-8901' },
    { id: 5, name: '박성광', phone: '010-5678-9012' },
  ];

  return (
    <div style={{ 
      padding: spacing.xxl,
      maxWidth: '1400px',
      margin: '0 auto',
      backgroundColor: colors.gray[50],
      minHeight: '100vh',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Malgun Gothic", "맑은 고딕", sans-serif',
    }}>
      {/* 헤더 */}
      <div style={{
        backgroundColor: colors.white,
        padding: spacing.xl,
        borderRadius: borderRadius.lg,
        marginBottom: spacing.xl,
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: spacing.md,
          marginBottom: spacing.md,
        }}>
          <div style={{
            backgroundColor: colors.brand,
            color: colors.white,
            padding: `${spacing.sm} ${spacing.lg}`,
            borderRadius: borderRadius.md,
            fontSize: '20px',
            fontWeight: '700',
          }}>
            AJ네트웍스
          </div>
          <h1 style={{
            fontSize: '24px',
            fontWeight: '600',
            color: colors.gray[900],
            margin: 0,
          }}>
            디자인 시스템 v3.0 완전판
          </h1>
        </div>
        <p style={{
          color: colors.gray[600],
          margin: 0,
          fontSize: '14px',
        }}>
          Phase 2 컴포넌트 추가: SummaryCard, ListModal, FilterSection, EmptyState
        </p>
      </div>

      {/* Summary Cards */}
      <div style={{ marginBottom: spacing.xl }}>
        <h2 style={{
          fontSize: '18px',
          fontWeight: '600',
          color: colors.gray[900],
          marginBottom: spacing.lg,
        }}>
          18. Summary Cards (통계 카드)
        </h2>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: spacing.lg,
        }}>
          <SummaryCard
            title="운송비"
            value={5000000}
            unit="원"
            color="primary"
            trend="up"
            trendValue="+12.5%"
          />
          <SummaryCard
            title="당송료"
            value={8000000}
            unit="원"
            color="success"
            trend="up"
            trendValue="+8.2%"
          />
          <SummaryCard
            title="배차료"
            value={6000000}
            unit="원"
            color="warning"
          />
          <SummaryCard
            title="수수료"
            value={3500000}
            unit="원"
            color="info"
            trend="down"
            trendValue="-3.1%"
          />
        </div>
      </div>

      {/* Filter Section */}
      <div style={{ marginBottom: spacing.xl }}>
        <h2 style={{
          fontSize: '18px',
          fontWeight: '600',
          color: colors.gray[900],
          marginBottom: spacing.lg,
        }}>
          21. Filter Section (필터 영역)
        </h2>
        <FilterSection
          onSearch={() => console.log('검색')}
          onReset={() => console.log('초기화')}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: spacing.xs }}>
            <label style={{ fontSize: '13px', fontWeight: '500', color: colors.gray[700] }}>
              운송구분
            </label>
            <select style={{
              height: '40px',
              padding: `0 ${spacing.md}`,
              border: `1px solid ${colors.gray[300]}`,
              borderRadius: borderRadius.md,
              fontSize: '14px',
            }}>
              <option>전체</option>
              <option>화물</option>
              <option>택배</option>
            </select>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: spacing.xs }}>
            <label style={{ fontSize: '13px', fontWeight: '500', color: colors.gray[700] }}>
              상태
            </label>
            <select style={{
              height: '40px',
              padding: `0 ${spacing.md}`,
              border: `1px solid ${colors.gray[300]}`,
              borderRadius: borderRadius.md,
              fontSize: '14px',
            }}>
              <option>전체</option>
              <option>대기</option>
              <option>진행중</option>
              <option>완료</option>
            </select>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: spacing.xs }}>
            <label style={{ fontSize: '13px', fontWeight: '500', color: colors.gray[700] }}>
              기간
            </label>
            <input
              type="date"
              style={{
                height: '40px',
                padding: `0 ${spacing.md}`,
                border: `1px solid ${colors.gray[300]}`,
                borderRadius: borderRadius.md,
                fontSize: '14px',
              }}
            />
          </div>
        </FilterSection>
      </div>

      {/* List Modal */}
      <div style={{ marginBottom: spacing.xl }}>
        <h2 style={{
          fontSize: '18px',
          fontWeight: '600',
          color: colors.gray[900],
          marginBottom: spacing.lg,
        }}>
          19. List Modal (리스트 선택 모달)
        </h2>
        <button
          onClick={() => setListModalOpen(true)}
          style={{
            padding: `${spacing.md} ${spacing.xl}`,
            backgroundColor: colors.primary,
            color: colors.white,
            border: 'none',
            borderRadius: borderRadius.md,
            fontSize: '14px',
            fontWeight: '500',
            cursor: 'pointer',
          }}
        >
          운송사 선택 모달 열기
        </button>
      </div>

      {/* Empty State */}
      <div style={{
        backgroundColor: colors.white,
        borderRadius: borderRadius.lg,
        marginBottom: spacing.xl,
      }}>
        <h2 style={{
          fontSize: '18px',
          fontWeight: '600',
          color: colors.gray[900],
          padding: spacing.xl,
          paddingBottom: 0,
        }}>
          20. Empty State (빈 상태)
        </h2>
        <EmptyState
          message="공통 테이블 내역 없음"
          description="등록된 데이터가 없습니다. 새로운 항목을 추가해주세요."
          action={() => console.log('등록')}
          actionLabel="+ 새 항목 등록"
        />
      </div>

      {/* 종합 예시 */}
      <div style={{
        backgroundColor: colors.white,
        padding: spacing.xl,
        borderRadius: borderRadius.lg,
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
      }}>
        <h2 style={{
          fontSize: '18px',
          fontWeight: '600',
          color: colors.gray[900],
          marginTop: 0,
          marginBottom: spacing.xl,
        }}>
          종합 예시: 운송 관리 대시보드
        </h2>

        {/* 통계 */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: spacing.lg,
          marginBottom: spacing.xl,
        }}>
          <SummaryCard title="오늘 운송" value={24} unit="건" color="primary" />
          <SummaryCard title="진행중" value={18} unit="건" color="warning" />
          <SummaryCard title="완료" value={145} unit="건" color="success" />
          <SummaryCard title="총 매출" value={125000000} unit="원" color="info" />
        </div>

        {/* 필터 */}
        <FilterSection onSearch={() => {}} onReset={() => {}}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: spacing.xs }}>
            <label style={{ fontSize: '13px', fontWeight: '500', color: colors.gray[700] }}>
              검색어
            </label>
            <input
              type="text"
              placeholder="고객명 또는 주소"
              style={{
                height: '40px',
                padding: `0 ${spacing.md}`,
                border: `1px solid ${colors.gray[300]}`,
                borderRadius: borderRadius.md,
                fontSize: '14px',
              }}
            />
          </div>
        </FilterSection>
      </div>

      {/* Modals */}
      <ListModal
        isOpen={listModalOpen}
        onClose={() => setListModalOpen(false)}
        title="운송사 선택"
        items={mockCarriers}
        onSelect={(item) => {
          console.log('선택:', item);
          setListModalOpen(false);
        }}
      />
    </div>
  );
}
