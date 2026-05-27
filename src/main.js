import './style.css';

const form = document.querySelector('form');
const input = form.querySelector('#rss-url');

form.addEventListener('submit', (event) => {
    event.preventDefault();

    const obj = {
        url: input.value.trim(),
    }

    schema.validate(obj, { context: { feeds: state.feeds } });
});