import { useEffect } from 'react';

export default function useViewportHeight() {
  useEffect(() => {
    const setVh = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    };

    setVh(); // 초기 실행
    window.addEventListener('resize', setVh);

    return () => window.removeEventListener('resize', setVh);
  }, []);
}
