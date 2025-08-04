// 네비게이션 스크롤 효과
window.addEventListener('scroll', () => {
    const nav = document.querySelector('nav');
    const scrollIndicator = document.querySelector('.scroll-indicator');

    if (window.scrollY > 50) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }

    // 스크롤 인디케이터
    const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
    scrollIndicator.style.width = scrollPercent + '%';
});

// 부드러운 스크롤
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// 스크롤 다운 애니메이션
document.querySelector('.scroll-down')?.addEventListener('click', () => {
    const firstSection = document.querySelector('.project-overview');
    if (firstSection) {
        firstSection.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
});

// 기능 카드 호버 효과
document.querySelectorAll('.feature-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) rotateX(5deg)';
    });

    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) rotateX(0)';
    });
});

// 문제 해결 타임라인 애니메이션
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateX(0)';
        }
    });
}, observerOptions);

document.querySelectorAll('.problem-item').forEach(item => {
    item.style.opacity = '0';
    item.style.transform = 'translateX(-50px)';
    item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(item);
});

// 기술 스택 태그 랜덤 애니메이션
document.querySelectorAll('.tech-tag').forEach((tag, index) => {
    tag.style.animationDelay = `${index * 0.1}s`;
    tag.classList.add('fade-in');
});

// 결과물 링크 클릭 추적 (분석용)
document.querySelectorAll('.result-link').forEach(link => {
    link.addEventListener('click', function(e) {
        const linkType = this.closest('.result-card').querySelector('h3').textContent;
        console.log(`결과물 링크 클릭: ${linkType}`);

        // 외부 링크인 경우 새 탭에서 열기
        if (this.getAttribute('href').startsWith('http')) {
            e.preventDefault();
            window.open(this.getAttribute('href'), '_blank');
        }
    });
});

// 프로젝트 카드 3D 효과
document.querySelectorAll('.feature-card, .result-card, .other-project-card').forEach(card => {
    card.addEventListener('mousemove', function(e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;

        this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
    });

    card.addEventListener('mouseleave', function() {
        this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
    });
});

// 모바일 메뉴 토글
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const navLinks = document.querySelector('.nav-links');

if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener('click', function() {
        this.classList.toggle('active');
        navLinks.classList.toggle('active');
    });
}

// 스크롤 시 요소 페이드인 애니메이션
const fadeInObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in-visible');
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
});

// 애니메이션을 적용할 요소들
document.querySelectorAll('.overview-card, .tech-category, .feature-card, .result-card').forEach(el => {
    el.classList.add('fade-in-element');
    fadeInObserver.observe(el);
});

// 기술 스택 태그 클릭 시 정보 표시
document.querySelectorAll('.tech-tag').forEach(tag => {
    tag.addEventListener('click', function() {
        const techName = this.textContent;
        const techInfo = getTechInfo(techName);

        if (techInfo) {
            showTechModal(techName, techInfo);
        }
    });
});

// 기술 정보 데이터
function getTechInfo(techName) {
    const techData = {
        'React': '사용자 인터페이스 구축을 위한 JavaScript 라이브러리',
        'Spring Boot': 'Java 기반의 웹 애플리케이션 개발 프레임워크',
        'Oracle': '엔터프라이즈급 관계형 데이터베이스 관리 시스템',
        'WebSocket': '실시간 양방향 통신을 위한 통신 프로토콜',
        'MyBatis': 'Java 애플리케이션에서 SQL 매핑을 지원하는 프레임워크',
        'Toast UI': '웹 애플리케이션을 위한 UI 컴포넌트 라이브러리'
    };

    return techData[techName];
}

// 기술 정보 모달 표시
function showTechModal(techName, techInfo) {
    // 간단한 알림으로 구현 (실제로는 모달 창을 만들 수 있음)
    alert(`${techName}: ${techInfo}`);
}

// 페이지 로드 완료 시 애니메이션 시작
document.addEventListener('DOMContentLoaded', function() {
    // 히어로 섹션 애니메이션
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        heroContent.style.opacity = '0';
        heroContent.style.transform = 'translateY(30px)';

        setTimeout(() => {
            heroContent.style.transition = 'opacity 1s ease, transform 1s ease';
            heroContent.style.opacity = '1';
            heroContent.style.transform = 'translateY(0)';
        }, 500);
    }

    // 스크롤 인디케이터 초기화
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
        scrollIndicator.style.width = '0%';
    }
});

// 브라우저 뒤로가기/앞으로가기 처리
window.addEventListener('popstate', function(e) {
    // 필요한 경우 상태 복원 로직 추가
    console.log('Browser navigation detected');
});

// 페이지 언로드 시 정리
window.addEventListener('beforeunload', function() {
    // 필요한 경우 정리 작업 수행
    observer.disconnect();
    fadeInObserver.disconnect();
});

// CSS 애니메이션 클래스 추가
const style = document.createElement('style');
style.textContent = `
    .fade-in-element {
        opacity: 0;
        transform: translateY(20px);
        transition: opacity 0.6s ease, transform 0.6s ease;
    }
    
    .fade-in-visible {
        opacity: 1;
        transform: translateY(0);
    }
    
    .fade-in {
        animation: fadeInUp 0.6s ease forwards;
    }
    
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .mobile-menu-toggle.active span:nth-child(1) {
        transform: rotate(45deg) translate(5px, 5px);
    }
    
    .mobile-menu-toggle.active span:nth-child(2) {
        opacity: 0;
    }
    
    .mobile-menu-toggle.active span:nth-child(3) {
        transform: rotate(-45deg) translate(7px, -6px);
    }
    
    @media (max-width: 768px) {
        .nav-links.active {
            display: flex;
            flex-direction: column;
            position: absolute;
            top: 100%;
            left: 0;
            right: 0;
            background: rgba(15, 15, 35, 0.98);
            backdrop-filter: blur(10px);
            padding: 2rem;
            border-top: 1px solid rgba(13, 148, 136, 0.2);
        }
        
        .nav-links.active li {
            margin-bottom: 1rem;
        }
    }
`;

document.head.appendChild(style);