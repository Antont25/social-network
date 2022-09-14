import {AuthorizedUserType, UserProfileType} from '../../api/api';
import {
    appReducer,
    InitialStateTypeApp,
    setAuthorizedProfileUser,
    setAuthorizedStatus,
    setAuthorizedUser,
    setIsLoading,
    StatusAuthorizedType
} from '../appReducer';

let initialState = {} as InitialStateTypeApp

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
        serverError: null as null | string,
    }
})

test('Checking is progress Loading', () => {

    const newState = appReducer(initialState, setIsLoading(true))

    expect(newState.isLoading).toBe(true)
})
test('User authorization check', () => {
    const user = {
        id: 23,
        email: 'freeuser@gmail.com',
        login: 'freeUser'
    }

    const newState = appReducer(initialState, setAuthorizedUser(user))

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

    const newState = appReducer(initialState, setAuthorizedProfileUser(user))

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

    const newState = appReducer(initialState, setAuthorizedStatus('successfully'))

    expect(newState.authorizedStatus).toBe('successfully')
})
