import { useContext } from 'react'

import { CurrentUserContext } from '../utils'

export const useCurrentUser = () => {
    const currentUserContext = useContext(CurrentUserContext)

    if (!currentUserContext) {
        throw new Error('No current user context')
    }

    return currentUserContext
}
