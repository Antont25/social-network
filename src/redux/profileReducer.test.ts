import {
  addPost,
  InitialSateProfileType,
  PostsType,
  profileSlice,
  setStatusUpdates,
  setUserProfile,
} from './profileSlice';

import { UserProfileType } from 'type';

let initialSateProfile = {} as InitialSateProfileType;

beforeEach(() => {
  initialSateProfile = {
    posts: [
      { id: 1, massage: 'Everything is great', likes: 3 },
      { id: 2, massage: 'Looking for my dream job', likes: 4 },
      { id: 3, massage: 'I develop my skills', likes: 5 },
      { id: 4, massage: 'Got a job of your dreams', likes: 12 },
    ] as Array<PostsType>,
    userProfile: {} as UserProfileType,
    userStatus: null as null | string,
  };
});

test('Add post', () => {
  const newState = profileSlice(initialSateProfile, addPost('New Post'));

  // eslint-disable-next-line no-magic-numbers
  expect(newState.posts).toHaveLength(5);
  // eslint-disable-next-line no-magic-numbers
  expect(newState.posts[0].id).toBe(23);
  expect(newState.posts[0].likes).toBe(0);
  expect(newState.posts[0].massage).toBe('New Post');
});
test('Adding information about the user', () => {
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
    },
  };

  const newState = profileSlice(initialSateProfile, setUserProfile(user));

  expect(newState.userProfile.aboutMe).toBe(null);
  expect(newState.userProfile.contacts.vk).toBe(null);
  expect(newState.userProfile.contacts.facebook).toBe('userProfile');
  expect(newState.userProfile.contacts.youtube).toBe('youtube');
  expect(newState.userProfile.contacts.mainLink).toBe(null);
  expect(newState.userProfile.lookingForAJob).toBe(true);
  expect(newState.userProfile.fullName).toBe('userName');
  // eslint-disable-next-line no-magic-numbers
  expect(newState.userProfile.userId).toBe(23);
});
test('Change status of user', () => {
  const newState = profileSlice(initialSateProfile, setStatusUpdates('New Status'));

  expect(newState.userStatus).toBe('New Status');
  expect(newState.userProfile).toEqual({});
  expect(newState.posts).toEqual([
    { id: 1, massage: 'Everything is great', likes: 3 },
    { id: 2, massage: 'Looking for my dream job', likes: 4 },
    { id: 3, massage: 'I develop my skills', likes: 5 },
    { id: 4, massage: 'Got a job of your dreams', likes: 12 },
  ]);
});
