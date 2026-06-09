const parseRss = (xmlString) => {

    const doc = new DOMParser().parseFromString(xmlString, 'application/xml'); // здесь наша строка xml превращается в DOM

    if (doc.querySelector('parsererror') !== null) {
        throw new Error("invalidRss");
    }

    const title = doc.querySelector('channel > title').textContent;
    const description = doc.querySelector('channel > description').textContent;

    const feed = {
        title,
        description
    };

    const items = doc.querySelectorAll('item');

    const posts = Array.from(items).map(item => ({
        title: item.querySelector('title').textContent,
        description: item.querySelector('description').textContent,
        link: item.querySelector('link').textContent,
    }));

    return { feed, posts };
}

export default parseRss;