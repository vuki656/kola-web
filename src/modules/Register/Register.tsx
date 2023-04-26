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
    IconId,
    IconPassword,
} from '@tabler/icons-react'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'

import type { RegisterFormValueType } from './Register.types'
import { registerFormValidation } from './Register.validation'

import { useCreateUserMutation } from '@/graphql/types.generated'
import { extractFormFieldErrors } from '@/shared/utils'
import Link from 'next/link'

const ICON_SIZE = 17

export const Register = () => {
    const router = useRouter()

    const [createUserMutation, { loading }] = useCreateUserMutation({
        onCompleted: () => {
            void router.push('/')
        },
        onError: () => {
            showNotification({
                color: 'red',
                message: 'Unable to register, try again.',
                title: 'Error',
            })
        },
    })

    const { formState, handleSubmit, register } = useForm<RegisterFormValueType>({
        resolver: zodResolver(registerFormValidation),
    })

    const onSubmit = (formValue: RegisterFormValueType) => {
        void createUserMutation({
            variables: {
                input: {
                    email: formValue.email,
                    firstName: formValue.firstName,
                    lastName: formValue.lastName,
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
                            Register
                        </Text>
                        <TextInput
                            {...register('firstName')}
                            {...extractFormFieldErrors(formState.errors.firstName)}
                            icon={<IconId size={ICON_SIZE} />}
                            placeholder="First Name"
                        />
                        <TextInput
                            {...register('lastName')}
                            {...extractFormFieldErrors(formState.errors.lastName)}
                            icon={<IconId size={ICON_SIZE} />}
                            placeholder="Last Name"
                        />
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
                            type="password"
                        />
                        <PasswordInput
                            {...register('passwordConfirmation')}
                            {...extractFormFieldErrors(formState.errors.passwordConfirmation)}
                            icon={<IconPassword size={ICON_SIZE} />}
                            placeholder="Password Confirmation"
                            type="password"
                        />
                        <Button
                            type="submit"
                            loading={loading}
                        >
                            Register
                        </Button>
                        <Link href="/login">
                            <Text size='xs' align="center" color='gray.7'>
                                Already have an account? Login
                            </Text>
                        </Link>
                    </Stack>
                </Paper>
            </form>
        </Center>
    )
}
