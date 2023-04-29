import { onError } from "@apollo/client/link/error";
import {
    ApolloClient,
    createHttpLink,
    InMemoryCache,
    from,
} from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import { getCookie } from 'cookies-next'

import { COOKIE_TOKEN_NAME } from './constants'
import { isServerSide } from './utils'
import { logger } from "./logger";

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

    const errorLink = onError(({ graphQLErrors, networkError }) => {
        if (graphQLErrors) {
            graphQLErrors.forEach((graphQLError) => {
                logger.error({
                    message: "Graphql Error",
                    error: graphQLError
                })
            })
        }

        if (networkError) {
            logger.error({
                message: "Network Error",
                error: networkError
            })
        }
    })

    return new ApolloClient({
        cache: new InMemoryCache(),
        link: from([
            errorLink,
            authLink,
            httpLink
        ]),
        ssrMode: isServerSide(),
    })
}
