import {fetchUnFollowUser, InitialStateUserPageType, setUserSubscription, unFollow} from "./usersReducer";
import {api, ResponseType} from "../api/api";

jest.mock("../api/api")

const apiMock = api as jest.Mocked<typeof api>
const res: ResponseType = {
  resultCode: 0,
  data: {},
  messages: []
}


let state: InitialStateUserPageType

beforeEach(() => {
  state = {
    items: [{
      name: "Anton",
      id: 3,
      uniqueUrlName: null,
      photos: {
        small: null,
        large: null,
      },
      status: null,
      followed: true
    }],
    totalCount: 0,
    pageSize: 10,
    currentPage: 1,
    portionsNumber: 1,
    error: null,
    userSubscription: [] as Array<number>
  }
})

test("un follow users", async () => {

  let dispatchMock = jest.fn()
  let getStateMock = jest.fn()
  apiMock.unFollowUser.mockReturnValue(Promise.resolve(res))

  let thunk = fetchUnFollowUser(3)

  await thunk(dispatchMock, getStateMock, {})

  expect(dispatchMock).toBeCalledTimes(3)

  expect(dispatchMock).toHaveBeenNthCalledWith(1, setUserSubscription(3, true))
  expect(dispatchMock).toHaveBeenNthCalledWith(2, unFollow(3))
  expect(dispatchMock).toHaveBeenNthCalledWith(3, setUserSubscription(3, false))

})

test(" follow users", async () => {
  let dispatchMock = jest.fn()
  let getStateMock = jest.fn()
  apiMock.unFollowUser.mockReturnValue(Promise.resolve(res))

  let thunk = fetchUnFollowUser(2)

  await thunk(dispatchMock, getStateMock, {})

  expect(dispatchMock).toBeCalledTimes(3)

  expect(dispatchMock).toHaveBeenNthCalledWith(1, setUserSubscription(2, true))
  expect(dispatchMock).toHaveBeenNthCalledWith(2, unFollow(2))
  expect(dispatchMock).toHaveBeenNthCalledWith(3, setUserSubscription(2, false))

})
