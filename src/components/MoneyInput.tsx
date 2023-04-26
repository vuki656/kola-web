import type { NumberInputProps } from '@mantine/core'
import { NumberInput } from '@mantine/core'

// Taken from https://mantine.dev/core/number-input/#parser-and-formatter
export const MoneyInput = (props: NumberInputProps) => {
    const { ...other } = props

    return (
        <NumberInput
            {...other}
            parser={(value) => value.replaceAll(/€\s?|(,*)/g, '')}
            formatter={(value) => {
                return Number.isNaN(Number.parseFloat(value))
                    ? '€ '
                    : `€ ${value}`.replaceAll(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',')
            }}
            precision={2}
        />
    )
}
