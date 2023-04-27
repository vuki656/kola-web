import type { GetServerSideProps } from 'next'

import type {
    GetCurrentUserQuery,
    GetCurrentUserQueryVariables,
} from '@/graphql/types.generated'
import { GetCurrentUserDocument } from '@/graphql/types.generated'
import { Home } from '@/modules'
import { initializeApollo } from '@/shared'
import { COOKIE_TOKEN_NAME } from '@/shared/constants'

const HomePage = () => {
    return (
        <Home />
    )
}

export const getServerSideProps: GetServerSideProps<{}> = async ({ req, res }) => {
    const apollo = initializeApollo(req.cookies[COOKIE_TOKEN_NAME])

    const result = await apollo
        .query<GetCurrentUserQuery, GetCurrentUserQueryVariables>({
            query: GetCurrentUserDocument,
        })
        .catch((error: unknown) => {
            // TODO: what to do with this, error link?
            console.log(error)
        })

    if (!result) {
        return {
            props: {},
            redirect: {
                destination: '/login',
            },
        }
    }

    return {
        props: {},
    }
}

export default HomePage
