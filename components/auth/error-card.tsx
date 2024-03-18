import { ExclamationTriangleIcon } from '@radix-ui/react-icons'

import { CardWrapper } from '@/components/auth/card-wrapper'

export const ErrorCard = () => {
    return (
        <CardWrapper headerLabel="Something went wrong" backButtonLabel="Go back to login" backButtonHref="/auth/login" showSocial={false}>
            <div className="w-full flex justify-center items-center">
                <ExclamationTriangleIcon className="text-destructive" />
            </div>
        </CardWrapper>
    )
}
