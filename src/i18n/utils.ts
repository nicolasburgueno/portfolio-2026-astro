import { ui, defaultLang } from './ui';
import type { Lang, UIKeys } from './ui';

export function getLangFromUrl(url: URL): Lang {
  const [, lang] = url.pathname.split('/');
  if (lang in ui) return lang as Lang;
  return defaultLang;
}

export function useTranslations(lang: Lang) {
  return function t(key: UIKeys): string {
    return (ui[lang] as Record<string, string>)[key] ?? (ui[defaultLang] as Record<string, string>)[key] ?? key;
  };
}

export function getLocalePath(lang: Lang, path: string): string {
  if (lang === defaultLang) return path;
  return `/${lang}${path}`;
}

export function getAlternateLang(lang: Lang): Lang {
  return lang === 'en' ? 'es' : 'en';
}
