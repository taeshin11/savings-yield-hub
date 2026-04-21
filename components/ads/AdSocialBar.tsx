'use client';
import { useEffect } from 'react';

export function AdSocialBar() {
  useEffect(() => {
    const srcs = ["https://pl29147427.profitablecpmratenetwork.com/e0/77/8a/e0778ae92f4def53be9e7e7d3ce8b361.js", "https://pl29147430.profitablecpmratenetwork.com/63/2e/45/632e45c81bfc48b8691f67b5be83aa21.js"];
    const scripts = srcs.map((src) => {
      const s = document.createElement('script');
      s.src = src; s.async = true;
      document.head.appendChild(s);
      return s;
    });
    return () => scripts.forEach((s) => s.parentNode?.removeChild(s));
  }, []);
  return null;
}
