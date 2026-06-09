import { proxy } from 'valtio/vanilla'

const state = proxy({
    form: {
        error: '',
        status: 'idle'
    },
    feeds: [
    ],
    posts: [
    ],
    readPosts: []
});

export default state;