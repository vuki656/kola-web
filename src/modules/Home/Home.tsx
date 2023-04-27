import { useGetListingsQuery } from '@/graphql/types.generated'

export const Home = () => {
    useGetListingsQuery()

    return (
        <p>
            home
        </p>
    )
}
