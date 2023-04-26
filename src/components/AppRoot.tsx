import { AppShell } from '@mantine/core'
import type { PropsWithChildren } from 'react'

import { NavigationBar } from './NavigationBar'

export const AppRoot = (props: PropsWithChildren) => {
    const { children } = props

    return (
        <AppShell
            fixed={false}
            header={<NavigationBar />}
            padding="md"
            styles={(theme) => ({
                body: {
                    height: '100%',
                },
                main: {
                    backgroundColor: theme.colors.gray[0],
                    display: 'flex',
                    flex: 1,
                    overflow: 'hidden',
                    padding: 0,
                    zIndex: 1,
                },
                root: {
                    height: '100%',
                },
            })}
        >
            {children}
        </AppShell>
    )
}
