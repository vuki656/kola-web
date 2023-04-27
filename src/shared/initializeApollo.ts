import {
    ApolloClient,
    createHttpLink,
    InMemoryCache,
} from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import { getCookie } from 'cookies-next'

import { COOKIE_TOKEN_NAME } from './constants'

const IS_SSR = typeof window !== 'undefined'

export const initializeApollo = (token?: string) => {
    const httpLink = createHttpLink({
        credentials: 'include',
        uri: process.env.NEXT_PUBLIC_API_URL,
    })

    const authLink = setContext((_, { headers }) => {
        const cookie = getCookie(COOKIE_TOKEN_NAME)

        console.log('token', token)
        console.log('cookie: ', cookie)

        return {
            headers: {
                ...headers,
                cookie: `${COOKIE_TOKEN_NAME}=${cookie ?? token}`,
            },
        }
    })

    return new ApolloClient({
        cache: new InMemoryCache(),
        link: authLink.concat(httpLink),
        ssrMode: IS_SSR,
    })
}
