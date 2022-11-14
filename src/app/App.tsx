import React, {useEffect} from "react"
import "./App.css";
import {fetchAuthorizedData} from "../redux/appSlice";
import {ErrorSnackbar} from "../common/components/ErrorSnackbar/ErrorSnackbar";
import {WitchRouting} from "../common/components/Routing/WitchRouting";
import {useAppDispatch, useAppSelector} from "../common/utils/hooks/hooks";
import {Loading} from "../common/components/Loading/Loading";


const App = () => {
  const dispatch = useAppDispatch()
  const authorizedStatus = useAppSelector(state => state.app.authorizedStatus)

  useEffect(() => {
    dispatch(fetchAuthorizedData())
  }, [])


  if (authorizedStatus === "initialization") {
    return <Loading/>
  }

  return (
    <>
      <WitchRouting/>
      <ErrorSnackbar/>
    </>
  );
}

export default (App);

