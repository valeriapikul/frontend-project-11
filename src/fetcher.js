import axios from 'axios';

const fetchRss = (url) => {

    const urlAPI = `https://allorigins.hexlet.app/get?disableCache=true&url=${encodeURIComponent(url)}`;

    return axios.get(urlAPI)
        .then((response) => response.data.contents);
};

export default fetchRss;