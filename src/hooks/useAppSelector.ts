import { TypedUseSelectorHook, useSelector } from 'react-redux';

import { AppStoreType } from 'redux/store';

export const useAppSelector: TypedUseSelectorHook<AppStoreType> = useSelector;
