import { subscribe } from 'valtio/vanilla'

const initView = (state, input, feedback) => {

    subscribe(state, () => {
        input.className = 'form-control';
        feedback.className = '';
        feedback.textContent = '';

        if (state.form.status === 'failed') {

            input.classList.add('is-invalid');
            feedback.className = 'text-danger';
            feedback.textContent = state.form.error;

        } else if (state.form.status === 'success') {

            feedback.className = 'text-success';
            feedback.textContent = 'RSS успешно загружен';

        } else {
            return;
        };
    });
};

export default initView;