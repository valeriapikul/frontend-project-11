import './style.css';
import state from './state.js';
import schema from './validation.js';
import initView from './view.js';

const form = document.querySelector('form');
const input = form.querySelector('#rss-url');
const feedback = form.querySelector('#feedback-url');

initView(state, input, feedback);

form.addEventListener('submit', (event) => {
    event.preventDefault();

    const obj = {
        url: input.value.trim(),
    }

    schema.validate(obj, { context: { feeds: state.feeds } })
        .then((data) => {
            state.form.error = '';
            state.form.status = 'success';
            state.feeds.push(data.url);
            input.value = '';
            input.focus();
        })
        .catch((e) => {
            state.form.error = e.message;
            state.form.status = 'failed';
        }
        );
});