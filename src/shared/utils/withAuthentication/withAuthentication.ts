import type { GetServerSideProps } from 'next'

import type {
    GetCurrentUserQuery,
    GetCurrentUserQueryVariables,
} from '../../../graphql/types.generated'
import { GetCurrentUserDocument } from '../../../graphql/types.generated'
import { COOKIE_TOKEN_NAME } from '../../constants'
import { logger } from '../../logger'
import { initializeApollo } from '../initializeApollo'

import type { WithAuthenticationProps } from './withAuthentication.types'

export const withAuthentication = (): GetServerSideProps<WithAuthenticationProps> => {
    return async ({ req }) => {
        const apollo = initializeApollo(req.cookies[COOKIE_TOKEN_NAME])

        const result = await apollo
            .query<GetCurrentUserQuery, GetCurrentUserQueryVariables>({
                query: GetCurrentUserDocument,
            })
            .catch((error: unknown) => {
                logger.debug({
                    error,
                    message: 'Failed to get current user',
                })
            })

        if (!result?.data.currentUser) {
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
