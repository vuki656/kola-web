import { Home } from '@/modules'
import { withAuthentication } from '@/shared/utils'

export const getServerSideProps = withAuthentication()

const HomePage = () => {
    return (
        <Home />
    )
}

export default HomePage
