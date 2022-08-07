import {AuthorizedUserType, UserProfileType} from '../../api/api';
import {
    authorizedReducer, InitialStateTypeAuthorized,
    setAuthorizedProfileUser, setAuthorizedStatus,
    setAuthorizedUser,
    setIsLoading,
    StatusAuthorizedType
} from '../authorizedReducer';

let initialState = {} as InitialStateTypeAuthorized

beforeEach(() => {
    initialState = {
        isLoading: false,
        authorizedStatus: 'initialization' as StatusAuthorizedType,
        authorizedUser: {
            id: null,
            email: null,
            login: null
        } as AuthorizedUserType,
        authorizedProfileUser: {
            photos: {small: null}
        } as UserProfileType,
    }
})

test('Checking is progress loading', () => {

    const newState = authorizedReducer(initialState, setIsLoading(true))

    expect(newState.isLoading).toBe(true)
})
test('User authorization check', () => {
    const user = {
        id: 23,
        email: 'freeuser@gmail.com',
        login: 'freeUser'
    }

    const newState = authorizedReducer(initialState, setAuthorizedUser(user))

    expect(newState.authorizedUser.id).toBe(23)
    expect(newState.authorizedUser.email).toBe('freeuser@gmail.com')
    expect(newState.authorizedUser.login).toBe('freeUser')
})
test('Add information of user', () => {
    const user = {
        aboutMe: null,
        contacts: {
            facebook: 'userProfile',
            website: null,
            vk: null,
            twitter: null,
            instagram: null,
            youtube: 'youtube',
            github: null,
            mainLink: null,
        },
        lookingForAJob: true,
        lookingForAJobDescription: null,
        fullName: 'userName',
        userId: 23,
        photos: {
            small: null,
            large: null,
        }
    }

    const newState = authorizedReducer(initialState, setAuthorizedProfileUser(user))

    expect(newState.authorizedProfileUser.aboutMe).toBe(null)
    expect(newState.authorizedProfileUser.contacts.vk).toBe(null)
    expect(newState.authorizedProfileUser.contacts.facebook).toBe('userProfile')
    expect(newState.authorizedProfileUser.contacts.youtube).toBe('youtube')
    expect(newState.authorizedProfileUser.contacts.mainLink).toBe(null)
    expect(newState.authorizedProfileUser.lookingForAJob).toBe(true)
    expect(newState.authorizedProfileUser.fullName).toBe('userName')
    expect(newState.authorizedProfileUser.userId).toBe(23)

})
test('Authorized status change', () => {

    const newState = authorizedReducer(initialState, setAuthorizedStatus('successfully'))

    expect(newState.authorizedStatus).toBe('successfully')
})
