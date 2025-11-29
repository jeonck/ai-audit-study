/**
 * AI Safety & Audit Learning Portal - Main JavaScript
 * 학습 포탈의 네비게이션 및 마크다운 콘텐츠 로딩 기능
 */

// ========================================
// 상수 정의
// ========================================
const CONTENT_CONFIG = {
    'ai-safety': { file: 'ai-safety.md', contentId: 'ai-safety-content', loadedFlag: 'aiSafetyLoaded' },
    'audit-guide': { file: 'audit-guide.md', contentId: 'audit-guide-content', loadedFlag: 'auditGuideLoaded' },
    'gen-ai-audit': { file: 'gen-ai-data-quality-audit.md', contentId: 'gen-ai-audit-content', loadedFlag: 'genAiAuditLoaded' },
    'guidelines': { file: 'high-impact-guidelines.md', contentId: 'guidelines-content', loadedFlag: 'guidelinesLoaded' },
    'eu-guidelines': { file: 'eu-gpai-guidelines.md', contentId: 'eu-guidelines-content', loadedFlag: 'euGuidelinesLoaded' },
    'safeguards': { file: 'ai-safeguards.md', contentId: 'safeguards-content', loadedFlag: 'safeguardsLoaded' },
    'tta': { file: 'tta-guide.md', contentId: 'tta-content', loadedFlag: 'ttaLoaded' },
    'eu-ethics': { file: 'eu-ethics-guidelines.md', contentId: 'eu-ethics-content', loadedFlag: 'euEthicsLoaded' },
    'altai': { file: 'eu-altai-tool.md', contentId: 'altai-content', loadedFlag: 'altaiLoaded' },
    'risks': { file: 'ai-risks.md', contentId: 'risks-content', loadedFlag: 'risksLoaded' },
    'testing-scope': { file: 'ai-trustworthiness-testing-scope.md', contentId: 'testing-scope-content', loadedFlag: 'testingScopeLoaded' },
    'security': { file: 'ai-security-threats.md', contentId: 'security-content', loadedFlag: 'securityLoaded' },
    'nist': { file: 'nist-ai-rmf.md', contentId: 'nist-content', loadedFlag: 'nistLoaded' },
    'governance': { file: 'ai-governance-elements.md', contentId: 'governance-content', loadedFlag: 'governanceLoaded' },
    'iso-23894': { file: 'iso-23894-properties.md', contentId: 'iso-23894-content', loadedFlag: 'iso23894Loaded' },
    'iso-23894-overview': { file: 'iso-23894-standard-overview.md', contentId: 'iso-23894-overview-content', loadedFlag: 'iso23894OverviewLoaded' },
    'iso-24028': { file: 'iso-24028-trustworthiness.md', contentId: 'iso-24028-content', loadedFlag: 'iso24028Loaded' },
    'standards-overview': { file: 'ai-standards-overview.md', contentId: 'standards-overview-content', loadedFlag: 'standardsOverviewLoaded' },
    'cert-process': { file: 'ai-certification-process.md', contentId: 'cert-process-content', loadedFlag: 'certProcessLoaded' },
    'timeline': { file: 'ai-timeline.md', contentId: 'timeline-content', loadedFlag: 'timelineLoaded' },
    'tech-prof': { file: 'ai-tech-proficiency.md', contentId: 'tech-prof-content', loadedFlag: 'techProfLoaded' },
    'iso': { file: 'iso-42001.md', contentId: 'iso-content', loadedFlag: 'isoLoaded' },
    'standards': { file: 'ai-standards-trends.md', contentId: 'standards-content', loadedFlag: 'standardsLoaded' },
    'iso-22989': { file: 'iso-22989-terminology.md', contentId: 'iso-22989-content', loadedFlag: 'iso22989Loaded' },
    'llm-eval': { file: 'llm-evaluation-tools.md', contentId: 'llm-eval-content', loadedFlag: 'llmEvalLoaded' },
    'physical': { file: 'physical-ai.md', contentId: 'physical-content', loadedFlag: 'physicalLoaded' },
    'evolution': { file: 'ai-evolution-stages.md', contentId: 'evolution-content', loadedFlag: 'evolutionLoaded' },
    'eu-office': { file: 'eu-ai-office.md', contentId: 'eu-office-content', loadedFlag: 'euOfficeLoaded' },
    'openai': { file: 'openai-preparedness-framework.md', contentId: 'openai-content', loadedFlag: 'openaiLoaded' },
    'resources': { file: 'resources.md', contentId: 'resources-content', loadedFlag: 'resourcesLoaded' }
};

// ========================================
// 유틸리티 함수
// ========================================

/**
 * 마크다운 파일을 로드하고 HTML로 변환하여 표시
 * @param {string} file - 로드할 마크다운 파일명
 * @param {string} elementId - 콘텐츠를 표시할 요소의 ID
 */
async function loadMarkdownContent(file, elementId) {
    const element = document.getElementById(elementId);

    try {
        const response = await fetch(file);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const markdownText = await response.text();
        const html = marked.parse(markdownText);
        element.innerHTML = html;

    } catch (error) {
        console.error(`Error loading markdown content from ${file}:`, error);
        element.innerHTML = `
            <div class="error-message">
                <p>Sorry, there was an error loading the content.</p>
                <p>Please try again later or contact support.</p>
            </div>
        `;
    }
}

/**
 * 모든 섹션을 숨김 처리
 * @param {NodeList} sections - 섹션 요소들의 NodeList
 */
function hideAllSections(sections) {
    sections.forEach(section => section.classList.remove('active'));
}

/**
 * 지정된 섹션을 표시
 * @param {string} sectionId - 표시할 섹션의 ID
 */
function showSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.classList.add('active');
    }
}

/**
 * 섹션의 마크다운 콘텐츠를 필요시 로드
 * @param {string} sectionId - 섹션 ID
 */
function loadContentIfNeeded(sectionId) {
    const config = CONTENT_CONFIG[sectionId];

    if (!config) {
        return; // 설정이 없는 섹션 (예: home)
    }

    // 이미 로드되었는지 확인
    if (window[config.loadedFlag]) {
        return;
    }

    // 콘텐츠 로드
    loadMarkdownContent(config.file, config.contentId);
    window[config.loadedFlag] = true;
}

/**
 * 페이지 상단으로 스크롤
 */
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// ========================================
// 네비게이션 핸들러
// ========================================

/**
 * 네비게이션 링크 클릭 핸들러
 * @param {Event} e - 클릭 이벤트
 * @param {NodeList} sections - 모든 섹션 요소들
 */
function handleNavClick(e, sections) {
    e.preventDefault();

    const targetId = e.currentTarget.getAttribute('href').substring(1);

    hideAllSections(sections);
    showSection(targetId);
    loadContentIfNeeded(targetId);
    scrollToTop();
}

// 홈 링크를 위한 개별 핸들러 (헤더 제목 클릭용)
function initHomeLinkHandler() {
    const homeLink = document.querySelector('.home-link');
    if (homeLink) {
        homeLink.addEventListener('click', function(e) {
            e.preventDefault();

            // 모든 섹션 비활성화
            const sections = document.querySelectorAll('.section');
            hideAllSections(sections);

            // 홈 섹션 활성화
            const homeSection = document.getElementById('home');
            if (homeSection) {
                homeSection.classList.add('active');
            }

            // 최상단으로 스크롤
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}

/**
 * 네비게이션 초기화
 */
function initNavigation() {
    const navLinks = document.querySelectorAll('nav a');
    const sections = document.querySelectorAll('.section');

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => handleNavClick(e, sections));
    });
}

/**
 * 초기 섹션 설정
 */
function initializeDefaultSection() {
    const hash = window.location.hash;
    const homeSection = document.getElementById('home');

    if (hash === '' || hash === '#home') {
        homeSection.classList.add('active');
    } else {
        // URL 해시가 있으면 해당 섹션 활성화
        const targetId = hash.substring(1);
        showSection(targetId);
        loadContentIfNeeded(targetId);
    }
}

// ========================================
// 초기화
// ========================================

/**
 * 애플리케이션 초기화
 */
function initApp() {
    initNavigation();
    initializeDefaultSection();
}

// ========================================
// 드롭다운 메뉴 관리
// ========================================

/**
 * 드롭다운 메뉴 초기화
 */
function initDropdowns() {
    const dropdowns = document.querySelectorAll('.dropdown');

    dropdowns.forEach(dropdown => {
        const toggle = dropdown.querySelector('.dropdown-toggle');
        const menu = dropdown.querySelector('.dropdown-menu');

        if (!toggle || !menu) return;

        // 드롭다운 토글 버튼 클릭
        toggle.addEventListener('click', (e) => {
            e.stopPropagation();
            const isExpanded = dropdown.getAttribute('aria-expanded') === 'true';

            // 다른 모든 드롭다운 닫기
            closeAllDropdowns();

            // 현재 드롭다운 토글
            if (!isExpanded) {
                dropdown.setAttribute('aria-expanded', 'true');
                toggle.setAttribute('aria-expanded', 'true');
            }
        });

        // 드롭다운 메뉴 내 링크 클릭 시 메뉴 닫기
        const menuLinks = menu.querySelectorAll('a');
        menuLinks.forEach(link => {
            link.addEventListener('click', () => {
                closeAllDropdowns();
            });
        });
    });

    // 문서 클릭 시 모든 드롭다운 닫기
    document.addEventListener('click', () => {
        closeAllDropdowns();
    });
}

/**
 * 모든 드롭다운 메뉴 닫기
 */
function closeAllDropdowns() {
    const dropdowns = document.querySelectorAll('.dropdown');
    dropdowns.forEach(dropdown => {
        dropdown.setAttribute('aria-expanded', 'false');
        const toggle = dropdown.querySelector('.dropdown-toggle');
        if (toggle) {
            toggle.setAttribute('aria-expanded', 'false');
        }
    });
}

// ========================================
// 모바일 메뉴 관리
// ========================================

/**
 * 모바일 메뉴 초기화
 */
function initMobileMenu() {
    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    const mainNav = document.querySelector('.main-nav');

    if (!mobileToggle || !mainNav) return;

    mobileToggle.addEventListener('click', () => {
        const isExpanded = mobileToggle.getAttribute('aria-expanded') === 'true';

        if (isExpanded) {
            mobileToggle.setAttribute('aria-expanded', 'false');
            mobileToggle.setAttribute('aria-label', '메뉴 열기');
            mainNav.classList.remove('active');
        } else {
            mobileToggle.setAttribute('aria-expanded', 'true');
            mobileToggle.setAttribute('aria-label', '메뉴 닫기');
            mainNav.classList.add('active');
        }
    });

    // 메뉴 링크 클릭 시 모바일 메뉴 닫기
    const navLinks = mainNav.querySelectorAll('a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 768) {
                mobileToggle.setAttribute('aria-expanded', 'false');
                mobileToggle.setAttribute('aria-label', '메뉴 열기');
                mainNav.classList.remove('active');
            }
        });
    });
}

// ========================================
// 검색 기능
// ========================================

/**
 * 검색 기능 초기화
 */
function initSearch() {
    const searchInput = document.getElementById('search-input');
    const searchButton = document.getElementById('search-button');

    if (!searchInput || !searchButton) return;

    // 검색 실행
    const performSearch = () => {
        const query = searchInput.value.trim().toLowerCase();
        if (!query) return;

        // 모든 섹션 검색
        const sections = document.querySelectorAll('.section');
        let found = false;

        sections.forEach(section => {
            const content = section.textContent.toLowerCase();
            if (content.includes(query) && section.id !== 'home') {
                // 검색어가 포함된 첫 번째 섹션으로 이동
                if (!found) {
                    hideAllSections(sections);
                    showSection(section.id);
                    loadContentIfNeeded(section.id);
                    scrollToTop();
                    found = true;

                    // 검색어 하이라이트 (간단한 구현)
                    highlightSearchTerm(section, query);
                }
            }
        });

        if (!found) {
            alert(`"${query}"에 대한 검색 결과를 찾을 수 없습니다.`);
        }
    };

    // 버튼 클릭
    searchButton.addEventListener('click', performSearch);

    // Enter 키
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            performSearch();
        }
    });
}

/**
 * 검색어 하이라이트 (간단한 구현)
 * @param {Element} section - 섹션 요소
 * @param {string} query - 검색어
 */
function highlightSearchTerm(section, query) {
    // 실제 프로덕션에서는 더 정교한 하이라이트 구현 필요
    setTimeout(() => {
        const content = section.querySelector('.markdown-content');
        if (content) {
            content.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }, 100);
}

// ========================================
// 초기화 (업데이트)
// ========================================

/**
 * 애플리케이션 초기화
 */
function initApp() {
    initNavigation();
    initializeDefaultSection();
    initDropdowns();
    initMobileMenu();
    initSearch();
    initHomeLinkHandler();
}

// DOM이 준비되면 앱 초기화
document.addEventListener('DOMContentLoaded', initApp);