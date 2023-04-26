import {
    ApolloClient,
    InMemoryCache,
} from '@apollo/client'

export const initializeApollo = () => {
    return new ApolloClient({
        cache: new InMemoryCache(),
        uri: process.env.NEXT_PUBLIC_API_URL,
    })
}
