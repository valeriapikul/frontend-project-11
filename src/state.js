import { proxy } from 'valtio/vanilla'

const state = proxy({
    form: {
        error: '',
        status: 'idle'  // validating, failed, success, sending
    },
    feeds: [
    ],
    posts: [
    ]
});

export default state;