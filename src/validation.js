import { object, string, setLocale } from 'yup';

setLocale({
    mixed: {
        required: 'emptyValue',
    },
    string: {
        url: 'invalidURL', 
    },
});

const schema = object({
    url: string()
        .required()
        .url()
        .test(
            'not-duplicate',
            'duplicate',
            (value, context) => {
                const { feeds } = context.options.context;
                return !feeds.includes(value);
            },
        ),
});

export default schema;