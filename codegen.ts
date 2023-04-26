import type { CodegenConfig } from '@graphql-codegen/cli'

// TODO: generate graphql queries and mutations
const config: CodegenConfig = {
    overwrite: true,
    schema: ['./src/graphql/schema.graphql'],
    documents: ['./src/graphql/**/*.graphql'],
    config: {
        scalars: {
            DateTime: 'string',
        },
    },
    hooks: {
        afterAllFileWrite: ['./node_modules/.bin/prettier --write'],
    },
    generates: {
        'src/graphql/types.generated.ts': {
            plugins: [
                'fragment-matcher',
                'typescript-operations',
                'typescript-react-apollo',
            ],
            config: {
                withHooks: true,
                avoidOptionals: {
                    field: true,
                    object: true,
                },
            },
        },
    },
};

export default config
