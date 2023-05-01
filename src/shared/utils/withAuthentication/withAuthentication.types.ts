import type { GetCurrentUserQuery } from '../../../graphql/types.generated'

export type CurrentUserType = GetCurrentUserQuery['currentUser']

export type WithAuthenticationProps = { user: CurrentUserType | null }
