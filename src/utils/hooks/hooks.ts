import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux'
import {AppDispatch, AppStoreType} from "../../redux/store";


export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<AppStoreType> = useSelector