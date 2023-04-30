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
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'

import { RegisterTestIds } from './__test__/Register.test.ids'
import type { RegisterFormValueType } from './Register.types'
import { registerFormValidation } from './Register.validation'

import { useCreateUserMutation } from '@/graphql/types.generated'
import { FORM_ICON_SIZE_PX } from '@/shared/constants'
import { DATA_TEST_ID } from '@/shared/test/constants'
import { extractFormFieldErrors } from '@/shared/utils'

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
                            data-testid={RegisterTestIds.fields.firstName}
                            icon={<IconId size={FORM_ICON_SIZE_PX} />}
                            placeholder="First Name"
                            errorProps={{
                                [DATA_TEST_ID]: RegisterTestIds.fieldErrors.firstName,
                            }}
                        />
                        <TextInput
                            {...register('lastName')}
                            {...extractFormFieldErrors(formState.errors.lastName)}
                            data-testid={RegisterTestIds.fields.lastName}
                            icon={<IconId size={FORM_ICON_SIZE_PX} />}
                            placeholder="Last Name"
                            errorProps={{
                                [DATA_TEST_ID]: RegisterTestIds.fieldErrors.lastName,
                            }}
                        />
                        <TextInput
                            {...register('email')}
                            {...extractFormFieldErrors(formState.errors.email)}
                            icon={<IconAt size={FORM_ICON_SIZE_PX} />}
                            data-testid={RegisterTestIds.fields.email}
                            placeholder="Email"
                            type="email"
                            errorProps={{
                                [DATA_TEST_ID]: RegisterTestIds.fieldErrors.email,
                            }}
                        />
                        <PasswordInput
                            {...register('password')}
                            {...extractFormFieldErrors(formState.errors.password)}
                            data-testid={RegisterTestIds.fields.password}
                            icon={<IconPassword size={FORM_ICON_SIZE_PX} />}
                            placeholder="Password"
                            type="password"
                            errorProps={{
                                [DATA_TEST_ID]: RegisterTestIds.fieldErrors.password,
                            }}
                        />
                        <PasswordInput
                            {...register('passwordConfirmation')}
                            {...extractFormFieldErrors(formState.errors.passwordConfirmation)}
                            icon={<IconPassword size={FORM_ICON_SIZE_PX} />}
                            data-testid={RegisterTestIds.fields.passwordConfirmation}
                            placeholder="Password Confirmation"
                            type="password"
                            errorProps={{
                                [DATA_TEST_ID]: RegisterTestIds.fieldErrors.passwordConfirmation,
                            }}
                        />
                        <Button
                            type="submit"
                            data-testid={RegisterTestIds.buttons.register}
                            loading={loading}
                        >
                            Register
                        </Button>
                        <Link href="/login">
                            <Text
                                size="xs"
                                align="center"
                                color="gray.7"
                            >
                                Already have an account? Login
                            </Text>
                        </Link>
                    </Stack>
                </Paper>
            </form>
        </Center>
    )
}
