import env from '@/shared/env'
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client'
import { MantineProvider } from '@mantine/core'
import type { AppProps } from 'next/app'
import Head from 'next/head'

const client = new ApolloClient({
    cache: new InMemoryCache(),
    uri: env.API_URL,
})

const App = (props: AppProps) => {
    const { Component, pageProps } = props

    return (
        <>
            <Head>
                <title>
                    Page title
                </title>
                <meta
                    name="viewport"
                    content="minimum-scale=1, initial-scale=1, width=device-width"
                />
            </Head>
            <MantineProvider
                withGlobalStyles={true}
                withNormalizeCSS={true}
                theme={{
                    colorScheme: 'light',
                }}
            >
                <ApolloProvider client={client}>
                    <Component {...pageProps} />
                </ApolloProvider>
            </MantineProvider >
        </>
    )
}

export default App
