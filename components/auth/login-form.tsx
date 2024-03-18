'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { useState, useTransition } from 'react'
import { useSearchParams } from 'next/navigation'

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { CardWrapper } from '@/components/auth/card-wrapper'
import { loginFormSchema } from '@/lib/form-schemas'
import { Button } from '@/components/ui/button'
import { FormError } from '@/components/form-error'
import { FormSuccess } from '@/components/form-success'
import { login } from '@/actions/login'

export const LoginForm = () => {
    const searchParams = useSearchParams()

    const urlError = searchParams.get('error') === 'OAuthAccountNotLinked' ? 'Account for this email is already registered with another provider' : ''

    const [error, setError] = useState<string | undefined>('')

    const [success, setSuccess] = useState<string | undefined>('')

    const [isPending, startTransition] = useTransition()

    const form = useForm<z.infer<typeof loginFormSchema>>({
        resolver: zodResolver(loginFormSchema),
        defaultValues: {
            email: '',
            password: '',
        },
    })

    const onSubmit = (values: z.infer<typeof loginFormSchema>) => {
        setError('')
        setSuccess('')

        startTransition(() => {
            login(values)
                .then((data) => {
                    if (data && 'error' in data) {
                        setError(data.error)
                    }

                    if (data && 'success' in data) {
                        setSuccess(data.success)
                    }
                })
        })
    }

    return (
        <CardWrapper headerLabel="Welcome back" backButtonLabel="Don't have an account?" backButtonHref="/auth/register">
            <Form {...form}>
                <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
                    <div className="space-y-4">
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
                    <FormError message={error || urlError} />
                    <FormSuccess message={success} />
                    <Button className="w-full" type="submit" disabled={isPending}>Login</Button>
                </form>
            </Form>
        </CardWrapper>
    )
}
