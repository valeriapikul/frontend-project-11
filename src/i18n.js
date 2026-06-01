import i18next from 'i18next';
import ru from './locales/ru.js';

i18next.init({
  lng: 'ru',
  debug: false,
  resources: {
    ru: ru,
  },
  initImmediate: false,
});

export default i18next;
// после этого i18next.t('ключ') вернёт нужный текст