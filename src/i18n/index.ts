import { createI18n } from 'vue-i18n';

import enUS from './locales/en-US.json';
import zhCN from './locales/zh-CN.json';

const i18n = createI18n({
  legacy: false,
  locale: 'en-US',
  fallbackLocale: 'en-US',
  // silentTranslationWarn: true,
  // silentFallbackWarn: true,
  globalInjection: true,
  messages: {
    'en-US': enUS,
    'zh-CN': zhCN
  }
})

export default i18n;
