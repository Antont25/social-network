import {headerReducer, InitialStateHeaderType, showMenuHandler} from '../headerReducer';

let initialStateHeader = {} as InitialStateHeaderType

beforeEach(() => {
    initialStateHeader = {
        menuIsShow: false,
    }
})

test('Authorized status change', () => {

    const newState = headerReducer(initialStateHeader, showMenuHandler())

    expect(newState.menuIsShow).toBe(true)
})