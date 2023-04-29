import { createContext } from 'react'

import type { CurrentUserType } from './withAuthentication'

export class CurrentUserContextValue {
    private _user: CurrentUserType | null

    constructor(user: CurrentUserType | null) {
        this._user = user
    }

    public get user() {
        if (!this._user) {
            throw new Error('No current user')
        }

        return this._user
    }

    public clear() {
        this._user = null
    }
}

export const CurrentUserContext = createContext<CurrentUserContextValue | null>(null)
