import { zodResolver } from '@hookform/resolvers/zod'
import {
    Button,
    Modal,
    Stack,
    Textarea,
    TextInput,
} from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { showNotification } from '@mantine/notifications'
import {
    Controller,
    useForm,
} from 'react-hook-form'

import { MoneyInput } from '../MoneyInput'

import type { CreateListingFormValueType } from './CreateListingDialog.types'
import { createListingFormValidation } from './CreateListingDialog.validation'

import { useCreateListingMutation } from '@/graphql/types.generated'
import { extractFormFieldErrors } from '@/shared/utils'

export const CreateListingDialog = () => {
    const [isOpen, openActions] = useDisclosure(true)

    const [createListingMutation, { loading }] = useCreateListingMutation({
        onCompleted: () => {
            showNotification({
                color: 'green',
                message: 'Listing created successfully',
                title: 'Success',
            })

            openActions.close()
        },
        onError: () => {
            showNotification({
                color: 'red',
                message: 'Error creating listing',
                title: 'Error',
            })
        },
    })

    const {
        control,
        formState,
        handleSubmit,
        register,
    } = useForm<CreateListingFormValueType>({
        resolver: zodResolver(createListingFormValidation),
    })

    const onSubmit = (formValue: CreateListingFormValueType) => {
        void createListingMutation({
            variables: {
                input: {
                    description: formValue.description,
                    price: formValue.price,
                    title: formValue.title,
                },
            },
        })
    }

    return (
        <>
            <Button onClick={openActions.open}>
                Create Listing
            </Button>
            <Modal
                centered={true}
                onClose={openActions.close}
                opened={isOpen}
                size="lg"
                title="Create Listing"
            >
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Stack>
                        <TextInput
                            {...register('title')}
                            {...extractFormFieldErrors(formState.errors.title)}
                            label="Title"
                        />
                        <Textarea
                            {...register('description')}
                            {...extractFormFieldErrors(formState.errors.title)}
                            label="Description"
                            autosize={true}
                            minRows={8}
                        />
                        <Controller
                            control={control}
                            name="price"
                            render={(controller) => {
                                return (
                                    <MoneyInput
                                        {...extractFormFieldErrors(formState.errors.price)}
                                        onChange={controller.field.onChange}
                                        value={controller.field.value}
                                        label="Price"
                                    />
                                )
                            }}
                        />
                        <Button
                            type="submit"
                            loading={loading}
                        >
                            Create Listing
                        </Button>
                    </Stack>
                </form>
            </Modal>
        </>
    )
}
