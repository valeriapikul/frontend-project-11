import { subscribe } from 'valtio/vanilla'
import i18n from './i18n.js';


const renderFeeds = (feeds, container) => {
    container.innerHTML = '';

    if (feeds.length === 0) return;

    const h3 = document.createElement('h3');
    h3.textContent = i18n.t('feeds');
    container.appendChild(h3);

    const ul = document.createElement('ul');
    feeds.forEach((feed) => {
        const li = document.createElement('li');

        const h3 = document.createElement('h3');
        h3.textContent = feed.title;

        const p = document.createElement('p');
        p.textContent = feed.description;

        li.appendChild(h3);
        li.appendChild(p);
        ul.appendChild(li);
    });

    container.appendChild(ul);
};

const renderPosts = (posts, container, state) => {

    const modalTitle = document.querySelector('.modal-title');
    const modalBody = document.querySelector('.modal-body p');
    const modalLink = document.querySelector('.modal-footer a');

    container.innerHTML = '';

    if (posts.length === 0) return;

    const h3 = document.createElement('h3');
    h3.textContent = i18n.t('posts');
    container.appendChild(h3);

    const ul = document.createElement('ul');
    posts.forEach((post) => {
        const li = document.createElement('li');
        li.classList.add('d-flex', 'justify-content-between');
        const a = document.createElement('a');
        a.href = post.link;
        a.textContent = post.title;

        if (state.readPosts.includes(post.id)) {
            a.classList.add('fw-normal', 'link-secondary');
        } else {
            a.classList.add('fw-bold');
        }

        li.appendChild(a);

        const button = document.createElement('button');
        button.type = 'button';
        button.textContent = i18n.t('preview');
        button.dataset.id = post.id;
        li.appendChild(button);

        ul.appendChild(li);
    });

    ul.addEventListener('click', (event) => {
        if (event.target.tagName === 'BUTTON') {

            const id = event.target.dataset.id;

            const post = posts.find((p) => p.id === parseInt(id));
            state.readPosts.push(post.id);

            modalTitle.textContent = post.title;
            modalBody.textContent = post.description;
            modalLink.href = post.link;

            const modal = new bootstrap.Modal(document.querySelector('#modal'));
            modal.show();
        }
    });

    container.appendChild(ul);
};

const initView = (state, input, feedback, feedsContainer, postsContainer) => {

    subscribe(state, () => {

        renderFeeds(state.feeds, feedsContainer);
        renderPosts(state.posts, postsContainer, state);

        input.className = 'form-control';
        feedback.className = '';
        feedback.textContent = '';

        if (state.form.status === 'failed') {

            input.classList.add('is-invalid');
            feedback.className = 'text-danger';
            feedback.textContent = i18n.t(state.form.error);

        } else if (state.form.status === 'success') {

            feedback.className = 'text-success';
            feedback.textContent = i18n.t('successMessage');

        } else {
            return;
        };
    });
};

export default initView;