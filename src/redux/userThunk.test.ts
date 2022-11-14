import {
  fetchUnFollowUser,
  fetchUserData,
  InitialStateUserPageType, setUsers,
  setUserSubscription,
  unFollow
} from "./usersSlice";
import {api, FetchUserType, ResponseType} from "../api/api";
import {setIsLoading} from "./appSlice";

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

  expect(dispatchMock).toHaveBeenNthCalledWith(1, setUserSubscription({ userId: 3, isFollowing: true }))
  expect(dispatchMock).toHaveBeenNthCalledWith(2, unFollow(3))
  expect(dispatchMock).toHaveBeenNthCalledWith(3, setUserSubscription({ userId: 3, isFollowing: false }))

})

test(" follow users", async () => {
  let dispatchMock = jest.fn()
  let getStateMock = jest.fn()
  apiMock.unFollowUser.mockReturnValue(Promise.resolve(res))

  let thunk = fetchUnFollowUser(2)

  await thunk(dispatchMock, getStateMock, {})

  expect(dispatchMock).toBeCalledTimes(3)

  expect(dispatchMock).toHaveBeenNthCalledWith(1, setUserSubscription({ userId: 2, isFollowing: true }))
  expect(dispatchMock).toHaveBeenNthCalledWith(2, unFollow(2))
  expect(dispatchMock).toHaveBeenNthCalledWith(3, setUserSubscription({ userId: 2, isFollowing: false }))

})

test("Fetch data of users  ",
  async () => {
    let dispatchMock = jest.fn()
    let getStateMock = jest.fn()

    const obj: FetchUserType = {
      items: [
        {
          name: "anton",
          id: 1,
          status: "yo",
          uniqueUrlName: null,
          photos: { small: null, large: null },
          followed: false
        }
      ],
      totalCount: 10,
      error: null
    }

    apiMock.getUser.mockReturnValue(Promise.resolve(obj))

    let thunk = fetchUserData(10)

    await thunk(dispatchMock, getStateMock, {})

    expect(dispatchMock).toBeCalledTimes(3)

    expect(dispatchMock).toHaveBeenNthCalledWith(1, setIsLoading(true))
    expect(dispatchMock).toHaveBeenNthCalledWith(2, setUsers(obj))
    expect(dispatchMock).toHaveBeenNthCalledWith(3, setIsLoading(false))


  })
