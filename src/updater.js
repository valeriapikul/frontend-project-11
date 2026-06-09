import fetchRss from './fetcher.js';
import parseRss from './parser.js';

const UPDATE_INTERVAL = 5000;

const checkUpdates = (state) => {
  const promises = state.feeds.map((feed) =>
    fetchRss(feed.url)
      .then((xml) => {
        const { posts } = parseRss(xml);
        const existingLinks = new Set(state.posts.map((p) => p.link));
        const newPosts = posts.filter((p) => !existingLinks.has(p.link));

        if (newPosts.length > 0) {
          const newWithIds = newPosts.map((post, index) => ({
            id: Date.now() + index,
            feedId: feed.id,
            ...post,
          }));
          state.posts.unshift(...newWithIds);
        }
      })
      .catch(() => {})
  );

  Promise.all(promises).finally(() => {
    setTimeout(() => checkUpdates(state), UPDATE_INTERVAL);
  });
};

export default checkUpdates;