'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { useState, useTransition } from 'react'

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { CardWrapper } from '@/components/auth/card-wrapper'
import { registerFormSchema } from '@/lib/form-schemas'
import { Button } from '@/components/ui/button'
import { FormError } from '@/components/form-error'
import { FormSuccess } from '@/components/form-success'
import { register } from '@/actions/register'

export const RegisterForm = () => {
    const [error, setError] = useState<string | undefined>('')

    const [success, setSuccess] = useState<string | undefined>('')

    const [isPending, startTransition] = useTransition()

    const form = useForm<z.infer<typeof registerFormSchema>>({
        resolver: zodResolver(registerFormSchema),
        defaultValues: {
            name: '',
            email: '',
            password: '',
        },
    })

    const onSubmit = (values: z.infer<typeof registerFormSchema>) => {
        setError('')
        setSuccess('')

        startTransition(() => {
            register(values)
                .then((data) => {
                    if ('error' in data) {
                        setError(data.error)
                    }

                    if ('success' in data) {
                        setSuccess(data.success)
                    }
                })
        })
    }

    return (
        <CardWrapper headerLabel="Create an account" backButtonLabel="Already have an account?" backButtonHref="/auth/login">
            <Form {...form}>
                <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
                    <div className="space-y-4">
                        <FormField control={form.control} name="name" render={({ field }) => (
                            <FormItem>
                                <FormLabel>Name</FormLabel>
                                <FormControl>
                                    <Input placeholder="Jhon Doe" disabled={isPending} {...field} />
                                </FormControl>
                                <FormMessage className="text-xs italic" />
                            </FormItem>
                        )} />
                        <FormField control={form.control} name="email" render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input placeholder="jhondoe@example.com" disabled={isPending} {...field} />
                                </FormControl>
                                <FormMessage className="text-xs italic" />
                            </FormItem>
                        )} />
                        <FormField control={form.control} name="password" render={({ field }) => (
                            <FormItem>
                                <FormLabel>Password</FormLabel>
                                <FormControl>
                                    <Input type="password" placeholder="******" disabled={isPending} {...field} />
                                </FormControl>
                                <FormMessage className="text-xs italic" />
                            </FormItem>
                        )} />
                    </div>
                    <FormError message={error} />
                    <FormSuccess message={success} />
                    <Button className="w-full" type="submit" disabled={isPending}>Register</Button>
                </form>
            </Form>
        </CardWrapper>
    )
}
