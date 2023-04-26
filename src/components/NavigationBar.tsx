import {
    Group,
    Paper,
    Text,
} from '@mantine/core'
import { IconCar } from '@tabler/icons-react'

import { CreateListingDialog } from './CreateListingDialog'

export const NavigationBar = () => {
    return (
        <Paper shadow="sm">
            <Group position="apart">
                <Group
                    p={10}
                    spacing={5}
                >
                    <IconCar />
                    <Text
                        weight="bold"
                        size="xl"
                    >
                        KOLA
                    </Text>
                </Group>
                <CreateListingDialog />
            </Group>
        </Paper>
    )
}
