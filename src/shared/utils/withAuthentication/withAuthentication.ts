import type { GetServerSideProps } from 'next'

import type { WithAuthenticationProps } from './withAuthentication.types'

import type {
    GetCurrentUserQuery,
    GetCurrentUserQueryVariables,
} from '@/graphql/types.generated'
import { GetCurrentUserDocument } from '@/graphql/types.generated'
import { COOKIE_TOKEN_NAME } from '@/shared/constants'
import { initializeApollo } from '@/shared/utils'

export const withAuthentication = (): GetServerSideProps<WithAuthenticationProps> => {
    return async ({ req }) => {
        const apollo = initializeApollo(req.cookies[COOKIE_TOKEN_NAME])

        const result = await apollo.query<GetCurrentUserQuery, GetCurrentUserQueryVariables>({
            query: GetCurrentUserDocument,
        })

        if (!result.data.currentUser) {
            return {
                props: {
                    user: null,
                },
                redirect: {
                    destination: '/login',
                },
            }
        }

        return {
            props: {
                user: result.data.currentUser,
            },
        }
    }
}
