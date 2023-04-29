import {
    ApolloClient,
    createHttpLink,
    from,
    InMemoryCache,
} from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import { onError } from '@apollo/client/link/error'
import { getCookie } from 'cookies-next'

import { COOKIE_TOKEN_NAME } from '../constants'
import { logger } from '../logger'

import { isServerSide } from './isServerSide'

export const initializeApollo = (token?: string) => {
    const httpLink = createHttpLink({
        credentials: 'include',
        uri: process.env.NEXT_PUBLIC_API_URL,
    })

    const authLink = setContext((_, { headers }) => {
        const cookieToken = getCookie(COOKIE_TOKEN_NAME)

        return {
            headers: {
                ...headers,
                cookie: `${COOKIE_TOKEN_NAME}=${cookieToken ?? token}`,
            },
        }
    })

    const errorLink = onError(({ graphQLErrors, networkError, operation }) => {
        if (graphQLErrors) {
            graphQLErrors.forEach((graphQLError) => {
                logger.error({
                    error: graphQLError,
                    message: 'Graphql Error',
                    operation,
                })
            })
        }

        if (networkError) {
            logger.error({
                error: networkError,
                message: 'Network Error',
                operation,
            })
        }
    })

    return new ApolloClient({
        cache: new InMemoryCache(),
        link: from([
            errorLink,
            authLink,
            httpLink,
        ]),
        ssrMode: isServerSide(),
    })
}
