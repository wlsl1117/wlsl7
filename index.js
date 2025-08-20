
document.addEventListener('DOMContentLoaded', () => {
  const menu = document.getElementById('menuButtons');
  const intro = document.getElementById('intro');
  const btn = document.getElementById('moreBtn');
  const sections = document.querySelectorAll('section');
  const projectBtn = menu.querySelectorAll('button')[2]; // 세 번째 버튼(Project)
  const profileBtn = menu.querySelectorAll('button')[1]; // 두 번째 버튼(Profile)
  const mainBtn = menu.querySelectorAll('button')[0]; // 첫 번째 버튼(MAIN)
  const mainSection = document.getElementById('main');
  const fadeElements = document.querySelectorAll('.fade-in');

  // ✅ 1. intro 로딩 시 애니메이션
  intro.classList.add('visible');

  // ✅ 2. 스크롤 시 섹션 활성화 + 메뉴 숨김 처리 + fade-in 처리
  const handleScroll = () => {
    sections.forEach(section => {
      const sectionTop = section.getBoundingClientRect().top;
      if (sectionTop <= window.innerHeight * 0.8) {
        section.classList.add('visible');
      }
    });

    fadeElements.forEach(el => {
      const rect = el.getBoundingClientRect();
      if (rect.top <= window.innerHeight * 0.9 && rect.bottom >= 0) {
        el.classList.add('visible');
      } else {
        el.classList.remove('visible');
      }
    });

    const introBottom = intro.getBoundingClientRect().bottom;
    menu.style.display = introBottom <= 0 ? 'none' : 'flex';
  };

  handleScroll(); // 초기 실행
  window.addEventListener('scroll', handleScroll);

  // ✅ 3. 버튼 클릭 이벤트
  btn.addEventListener('click', () => {
    window.location.href = 'profile.html';
  });

  projectBtn.addEventListener('click', () => {
    document.getElementById('project').scrollIntoView({ behavior: 'smooth' });
  });

  profileBtn.addEventListener('click', () => {
    mainSection.scrollIntoView({ behavior: 'smooth' });
  });

  mainBtn.addEventListener('click', () => {
    window.location.href = 'profile.html';
  });

  // ✅ 4. 휠 스크롤 시 400px 단위로 이동 (한 번에 뚝!)
  let isScrolling = false;
  window.addEventListener('wheel', (e) => {
    if (isScrolling) return;

    e.preventDefault(); // 기본 스크롤 방지
    isScrolling = true;

    const direction = e.deltaY > 0 ? 1 : -1;
    const scrollTarget = window.scrollY + direction * 400;

    window.scrollTo({
      top: scrollTarget,
      behavior: 'smooth'
    });

    setTimeout(() => {
      isScrolling = false;
    }, 500); // 스크롤 중복 방지
  }, { passive: false });
});

