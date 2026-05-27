import { object, string } from 'yup';

const schema = object({
    url: string()
        .required('Не должно быть пустым')
        .url('Ссылка должна быть валидным URL')
        .test(
            'not-duplicate',
            'RSS уже существует',
            (value, context) => {
                const { feeds } = context.options.context;
                return !feeds.includes(value);
            },
        ),
});

export default schema;