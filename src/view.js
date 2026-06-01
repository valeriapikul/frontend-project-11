import { subscribe } from 'valtio/vanilla'
import i18next from './i18n.js';

const initView = (state, input, feedback) => {

    subscribe(state, () => {
        input.className = 'form-control';
        feedback.className = '';
        feedback.textContent = '';

        if (state.form.status === 'failed') {

            input.classList.add('is-invalid');
            feedback.className = 'text-danger';
            feedback.textContent = i18next.t(state.form.error);

        } else if (state.form.status === 'success') {

            feedback.className = 'text-success';
            feedback.textContent = i18next.t('successMessage');

        } else {
            return;
        };
    });
};

export default initView;