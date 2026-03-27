import { navigate } from 'astro:transitions/client';
import type { Lang } from '../../i18n/ui';

interface Props {
  lang: Lang;
}

export default function LanguageSwitch({ lang }: Props) {
  function handleSwitch() {
    const currentPath = window.location.pathname;
    let nextPath: string;

    if (lang === 'en') {
      // Switch to ES: prefix /es
      nextPath = `/es${currentPath === '/' ? '' : currentPath}`;
    } else {
      // Switch to EN: remove /es prefix
      nextPath = currentPath.replace(/^\/es/, '') || '/';
    }

    navigate(nextPath);
  }

  return (
    <button
      onClick={handleSwitch}
      aria-label="Switch language"
      title={lang === 'en' ? 'Switch to Español' : 'Switch to English'}
      className="p-2 rounded-lg text-[var(--color-secondary)] hover:text-[var(--color-accent)] hover:bg-white/5 transition-colors text-xs font-semibold font-mono tracking-wider"
    >
      {lang === 'en' ? 'ES' : 'EN'}
    </button>
  );
}
