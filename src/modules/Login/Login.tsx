import { zodResolver } from '@hookform/resolvers/zod'
import {
    Button,
    Center,
    Paper,
    PasswordInput,
    Stack,
    Text,
    TextInput,
} from '@mantine/core'
import { showNotification } from '@mantine/notifications'
import {
    IconAt,
    IconPassword,
} from '@tabler/icons-react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'

import type { LoginFormValueType } from './Login.types'
import { loginFormValidation } from './Login.validation'

import { useLoginUserMutation } from '@/graphql/types.generated'
import { extractFormFieldErrors } from '@/shared/utils'

const ICON_SIZE = 17

export const Login = () => {
    const router = useRouter()

    const [loginUserMutation, { loading }] = useLoginUserMutation({
        onCompleted: () => {
            void router.push('/')
        },
        onError: () => {
            showNotification({
                color: 'red',
                message: 'Wrong username or password',
                title: 'Error',
            })
        },
    })

    const { formState, handleSubmit, register } = useForm<LoginFormValueType>({
        resolver: zodResolver(loginFormValidation),
    })

    const onSubmit = (formValue: LoginFormValueType) => {
        loginUserMutation({
            variables: {
                input: {
                    email: formValue.email,
                    password: formValue.password,
                },
            },
        })
    }

    return (
        <Center
            sx={(theme) => ({
                backgroundColor: theme.colors.gray[0],
                height: '100%',
            })}
        >
            <form onSubmit={handleSubmit(onSubmit)}>
                <Paper
                    shadow="sm"
                    p="xl"
                >
                    <Stack>
                        <Text
                            align="center"
                            size="lg"
                            weight="bold"
                        >
                            Login
                        </Text>
                        <TextInput
                            {...register('email')}
                            {...extractFormFieldErrors(formState.errors.email)}
                            icon={<IconAt size={ICON_SIZE} />}
                            placeholder="Email"
                            type="email"
                        />
                        <PasswordInput
                            {...register('password')}
                            {...extractFormFieldErrors(formState.errors.password)}
                            icon={<IconPassword size={ICON_SIZE} />}
                            placeholder="Password"
                        />
                        <Button
                            type="submit"
                            loading={loading}
                        >
                            Login
                        </Button>
                        <Link href="/register">
                            <Text
                                size="xs"
                                align="center"
                                color="gray.7"
                            >
                                Don't have an account? Register
                            </Text>
                        </Link>
                    </Stack>
                </Paper>
            </form>
        </Center>
    )
}