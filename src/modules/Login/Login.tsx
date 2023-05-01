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
import { setCookie } from 'cookies-next'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'

import { useLoginUserMutation } from '../../graphql/types.generated'
import {
    COOKIE_TOKEN_NAME,
    FORM_ICON_SIZE_PX,
} from '../../shared/constants'
import { extractFormFieldErrors } from '../../shared/utils'

import type { LoginFormValueType } from './Login.types'
import { loginFormValidation } from './Login.validation'

export const Login = () => {
    const router = useRouter()

    const [loginUserMutation, { loading }] = useLoginUserMutation({
        onCompleted: (response) => {
            setCookie(COOKIE_TOKEN_NAME, response.loginUser.token)

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
        void loginUserMutation({
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
                            icon={<IconAt size={FORM_ICON_SIZE_PX} />}
                            placeholder="Email"
                            type="email"
                        />
                        <PasswordInput
                            {...register('password')}
                            {...extractFormFieldErrors(formState.errors.password)}
                            icon={<IconPassword size={FORM_ICON_SIZE_PX} />}
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
                                Don&apos;t have an account? Register
                            </Text>
                        </Link>
                    </Stack>
                </Paper>
            </form>
        </Center>
    )
}
