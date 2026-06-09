import './style.css';
import schema from './validation.js';
import initView from './view.js';
import parseRss from './parser.js';
import fetchRss from './fetcher.js';
import checkUpdates from './updater.js';

const init = () => {
    const state = proxy({
        form: { status: 'idle', error: null },
        feeds: [],
        posts: [],
    });

    const form = document.querySelector('form');
    const input = form.querySelector('#rss-url');
    const feedback = form.querySelector('#feedback-url');
    const feedsContainer = document.querySelector('#feeds');
    const postsContainer = document.querySelector('#posts');

    initView(state, input, feedback, feedsContainer, postsContainer);

    form.addEventListener('submit', (event) => {
        event.preventDefault();

        const url = input.value.trim();

        const obj = { url };

        schema.validate(obj, { context: { feeds: state.feeds } })
            .then(() => {
                state.form.status = 'sending';
                return fetchRss(url);
            })
            .then((xml) => {
                return parseRss(xml);
            })
            .then((parsed) => {

                const feedId = Date.now();

                state.feeds.push({
                    id: feedId,
                    url,
                    ...parsed.feed
                });

                const posts = parsed.posts.map((post, index) => ({
                    id: feedId + index,
                    feedId,
                    ...post,
                }));

                state.posts.push(...posts);

                state.form.status = 'success';

                if (state.feeds.length === 1) {  // запускаем цикл только один раз
                    checkUpdates(state);
                }

                input.value = '';
                input.focus();

            })
            .catch((e) => {
                const errorCode = e.isAxiosError ? 'networkError' : e.message;
                state.form.error = errorCode;
                state.form.status = 'failed';
            })
    });

};

init();