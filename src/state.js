import { proxy } from 'valtio/vanilla'

const state = proxy({
    form: {
        value: '',
        error: '',
        status: 'idle'  // validating, failed, success 
    },
    feeds: []
});

export default state;