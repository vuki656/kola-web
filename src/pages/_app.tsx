import { ApolloProvider } from '@apollo/client'
import { MantineProvider } from '@mantine/core'
import { Notifications } from '@mantine/notifications'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { useRouter } from 'next/router'

import {
    AppRoot,
    GlobalStyles,
} from '@/components'
import { initializeApollo } from '@/shared'

const apolloClient = initializeApollo()

const App = (props: AppProps) => {
    const { Component, pageProps } = props

    const { pathname } = useRouter()

    const isAppAppRoute =
        !pathname.startsWith('/login') &&
        !pathname.startsWith('/register')

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
            <ApolloProvider client={apolloClient}>
                <MantineProvider
                    withGlobalStyles={true}
                    withNormalizeCSS={true}
                    theme={{
                        colorScheme: 'light',
                    }}
                >
                    <GlobalStyles />
                    <Notifications />
                    {isAppAppRoute ? (
                        <AppRoot>
                            <Component {...pageProps} />
                        </AppRoot>
                    ) : <Component {...pageProps} />}
                </MantineProvider>
            </ApolloProvider>
        </>
    )
}

export default App
