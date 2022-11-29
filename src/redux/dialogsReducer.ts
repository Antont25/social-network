import { Dispatch } from 'redux';

import { AppThunk } from './store';

import { chatApi } from 'api/chatApi';
import { MessageType } from 'type';

type InitialStateType = typeof initialState;
export type DialogsType = {
  id: number;
  name: string;
};

export type ActionDialogsReducerType = ReturnType<typeof setMessage>;

const initialState = {
  dialogs: [
    { id: 1, name: 'Amdrey' },
    { id: 2, name: 'Any' },
  ] as Array<DialogsType>,
  messages: [] as MessageType[],
};

export const dialogsReducer = (
  // eslint-disable-next-line default-param-last
  state = initialState,
  action: ActionDialogsReducerType,
): InitialStateType => {
  switch (action.type) {
    case 'DIALOGS/ADD_MESSAGE':
      // eslint-disable-next-line no-case-declarations
      const newMessage = action.payload ? [...state.messages, ...action.payload] : [];

      return {
        ...state,
        messages: newMessage,
      };

    default:
      return state;
  }
};

export const setMessage = (payload: MessageType[] | null) =>
  ({ type: 'DIALOGS/ADD_MESSAGE', payload } as const);

const newMessage = (dispatch: Dispatch) => (message: MessageType[] | null) => {
  dispatch(setMessage(message));
};

export const createChatWS = (): AppThunk => dispatch => {
  chatApi.stop();
  chatApi.start();
  chatApi.subscriber(newMessage(dispatch));
};

export const addMessage =
  (message: string): AppThunk =>
  () => {
    chatApi.setNewMessage(message);
  };

export const removeChatWS = (): AppThunk => () => {
  chatApi.stop();
};
