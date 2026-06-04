import { subscribe } from 'valtio/vanilla'
import i18next from './i18n.js';


const renderFeeds = (feeds, container) => {
    container.innerHTML = '';

    const h2 = document.createElement('h2');
    h2.textContent = 'Фиды';
    container.appendChild(h2);

    const ul = document.createElement('ul');
    feeds.forEach((feed) => {
        const li = document.createElement('li');
        li.innerHTML = `<strong>${feed.title}</strong><p>${feed.description}</p>`;
        ul.appendChild(li);
    });

    container.appendChild(ul);
};

const renderPosts = (posts, container) => {
    container.innerHTML = '';

    const h2 = document.createElement('h2');
    h2.textContent = 'Посты';
    container.appendChild(h2);

    const ul = document.createElement('ul');
    posts.forEach((post) => {
        const li = document.createElement('li');
        const a = document.createElement('a');
        a.href = post.link;
        a.textContent = post.title;
        li.appendChild(a);
        ul.appendChild(li);
    });

    container.appendChild(ul);
};

const initView = (state, input, feedback, feedsContainer, postsContainer) => {

    subscribe(state, () => {

        renderFeeds(state.feeds, feedsContainer);
        renderPosts(state.posts, postsContainer);

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