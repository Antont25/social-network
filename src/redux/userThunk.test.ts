import { setIsLoading } from './appSlice';
import {
  fetchUnFollowUser,
  fetchUserData,
  InitialStateUserPageType,
  setUsers,
  setUserSubscription,
  unFollow,
} from './usersSlice';

import { profileApi } from 'api/profileApi';
import { userApi } from 'api/userApi';
import { FetchUserType, ResponseType } from 'type';

jest.mock('api/profileApi');

const apiMock = profileApi as jest.Mocked<typeof profileApi>;
const apiUserMock = userApi as jest.Mocked<typeof userApi>;
const res: ResponseType = {
  resultCode: 0,
  data: {},
  messages: [],
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
let state: InitialStateUserPageType;

beforeEach(() => {
  state = {
    items: [
      {
        name: 'Anton',
        id: 3,
        uniqueUrlName: null,
        photos: {
          small: null,
          large: null,
        },
        status: null,
        followed: true,
      },
    ],
    totalCount: 0,
    pageSize: 10,
    currentPage: 1,
    portionsNumber: 1,
    error: null,
    userSubscription: [] as Array<number>,
  };
});

test('un follow users', async () => {
  const dispatchMock = jest.fn();
  const getStateMock = jest.fn();

  apiMock.unFollowUser.mockReturnValue(Promise.resolve(res));

  // eslint-disable-next-line no-magic-numbers
  const thunk = fetchUnFollowUser(3);

  await thunk(dispatchMock, getStateMock, {});

  // eslint-disable-next-line no-magic-numbers
  expect(dispatchMock).toBeCalledTimes(3);

  expect(dispatchMock).toHaveBeenNthCalledWith(
    1,
    setUserSubscription({ userId: 3, isFollowing: true }),
  );
  // eslint-disable-next-line no-magic-numbers
  expect(dispatchMock).toHaveBeenNthCalledWith(2, unFollow(3));
  expect(dispatchMock).toHaveBeenNthCalledWith(
    // eslint-disable-next-line no-magic-numbers
    3,
    setUserSubscription({ userId: 3, isFollowing: false }),
  );
});

test(' follow users', async () => {
  const dispatchMock = jest.fn();
  const getStateMock = jest.fn();

  apiMock.unFollowUser.mockReturnValue(Promise.resolve(res));

  // eslint-disable-next-line no-magic-numbers
  const thunk = fetchUnFollowUser(2);

  await thunk(dispatchMock, getStateMock, {});

  // eslint-disable-next-line no-magic-numbers
  expect(dispatchMock).toBeCalledTimes(3);

  expect(dispatchMock).toHaveBeenNthCalledWith(
    1,
    setUserSubscription({ userId: 2, isFollowing: true }),
  );
  // eslint-disable-next-line no-magic-numbers
  expect(dispatchMock).toHaveBeenNthCalledWith(2, unFollow(2));
  expect(dispatchMock).toHaveBeenNthCalledWith(
    // eslint-disable-next-line no-magic-numbers
    3,
    setUserSubscription({ userId: 2, isFollowing: false }),
  );
});

test('Fetch data of users  ', async () => {
  const dispatchMock = jest.fn();
  const getStateMock = jest.fn();

  const obj: FetchUserType = {
    items: [
      {
        name: 'anton',
        id: 1,
        status: 'yo',
        uniqueUrlName: null,
        photos: { small: null, large: null },
        followed: false,
      },
    ],
    totalCount: 10,
    error: null,
  };

  apiUserMock.getUser.mockReturnValue(Promise.resolve(obj));

  // eslint-disable-next-line no-magic-numbers
  const thunk = fetchUserData(10);

  await thunk(dispatchMock, getStateMock, {});

  // eslint-disable-next-line no-magic-numbers
  expect(dispatchMock).toBeCalledTimes(3);

  expect(dispatchMock).toHaveBeenNthCalledWith(1, setIsLoading(true));
  // eslint-disable-next-line no-magic-numbers
  expect(dispatchMock).toHaveBeenNthCalledWith(2, setUsers(obj));
  // eslint-disable-next-line no-magic-numbers
  expect(dispatchMock).toHaveBeenNthCalledWith(3, setIsLoading(false));
});
