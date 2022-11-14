import React, {useEffect, useMemo, useState} from "react";
import {Pagination} from "../common/components/Pagination/Pagination";
import {Loading} from "../common/components/Loading/Loading";
import {fetchUserData,} from "../redux/usersSlice";
import {User} from "../components/Users/User";
import {useAppDispatch, useAppSelector} from "../common/utils/hooks/hooks";
import useDebounce from "../common/utils/hooks/useDebounce";
import Search from "../components/Users/search/Search";


const Users = () => {

  const dispatch = useAppDispatch()
  const users = useAppSelector(state => state.usersPage.items)
  const totalCount = useAppSelector(state => state.usersPage.totalCount)
  const pageSize = useAppSelector(state => state.usersPage.pageSize)
  const currentPage = useAppSelector(state => state.usersPage.currentPage)
  const userSubscription = useAppSelector(state => state.usersPage.userSubscription)
  const portionsNumber = useAppSelector(state => state.usersPage.portionsNumber)
  const isLoading = useAppSelector(state => state.app.isLoading)
  const authorizedStatus = useAppSelector(state => state.app.authorizedStatus)

  const [valueSearchInput, setValueSearchInput] = useState("")

  const debouncedValue = useDebounce<string>(valueSearchInput)


  useEffect(() => {
    dispatch(fetchUserData(currentPage, valueSearchInput))
  }, [currentPage, debouncedValue])

  const usersList = useMemo(() => {
    return users.map(item =>
      <User key={item.id}
            users={item}
            authorizedStatus={authorizedStatus}
            userSubscription={userSubscription}/>)
  }, [users])


  if (isLoading) {
    return <Loading/>
  }

  return (
    <div>
      <Search setValueSearchInput={setValueSearchInput} valueSearchInput={valueSearchInput}/>
      {usersList}
      <Pagination currentPage={currentPage}
                  totalCount={totalCount}
                  pageSize={pageSize}
                  portionsNumber={portionsNumber}
      />
    </div>
  );
};
export default Users





