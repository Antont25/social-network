import React, { ReactElement, useEffect, useMemo, useState } from 'react';

import { Loading } from 'common/components/Loading';
import { Pagination } from 'common/components/Pagination';
import { User } from 'components/User';
import { Search } from 'components/User/search/Search';
import { useAppDispatch, useAppSelector, useDebounce } from 'hooks';
import { fetchUserData } from 'redux/usersSlice';
import {
  getAuthorizedStatus,
  getCurrentPage,
  getIsLoading,
  getPageSize,
  getPortionsNumber,
  getTotalCount,
  getUsers,
  getUserSubscription,
} from 'selectors';

const Users = (): ReactElement => {
  const dispatch = useAppDispatch();

  const users = useAppSelector(getUsers);
  const totalCount = useAppSelector(getTotalCount);
  const pageSize = useAppSelector(getPageSize);
  const currentPage = useAppSelector(getCurrentPage);
  const userSubscription = useAppSelector(getUserSubscription);
  const portionsNumber = useAppSelector(getPortionsNumber);
  const isLoading = useAppSelector(getIsLoading);
  const authorizedStatus = useAppSelector(getAuthorizedStatus);

  const [valueSearchInput, setValueSearchInput] = useState('');

  const debouncedValue = useDebounce<string>(valueSearchInput);

  useEffect(() => {
    dispatch(fetchUserData(currentPage, valueSearchInput));
  }, [currentPage, debouncedValue]);

  const usersList = useMemo(() => {
    return users.map(item => (
      <User
        key={item.id}
        users={item}
        authorizedStatus={authorizedStatus}
        userSubscription={userSubscription}
      />
    ));
  }, [users, userSubscription]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div>
      <Search
        setValueSearchInput={setValueSearchInput}
        valueSearchInput={valueSearchInput}
      />
      {usersList}
      <Pagination
        currentPage={currentPage}
        totalCount={totalCount}
        pageSize={pageSize}
        portionsNumber={portionsNumber}
      />
    </div>
  );
};

export default Users;
