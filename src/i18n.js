import i18n from 'i18n';
import ru from './locales/ru.js';

const i18n = i18n.createInstance();

i18n.init({
  lng: 'ru',
  debug: false,
  resources: {
    ru: ru,
  },
  initImmediate: false,
});

export default i18n;