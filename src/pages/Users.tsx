import React, {useEffect} from 'react';
import {Pagination} from '../components/common/pagination/Pagination';
import {Loading} from '../components/common/loading/Loading';
import {fetchUserData,} from '../redux/usersReducer';
import {User} from '../components/users/User';
import {useAppDispatch, useAppSelector} from '../utils/hooks/hooks';


export const Users = () => {
    const dispatch = useAppDispatch()
    const {
        users,
        totalCount,
        pageSize,
        currentPage,
        userSubscription,
        portionsNumber,
        isLoading,
        authorizedStatus
    } = useAppSelector(state =>
        ({
            users: state.usersPage.items,
            totalCount: state.usersPage.totalCount,
            pageSize: state.usersPage.pageSize,
            currentPage: state.usersPage.currentPage,
            userSubscription: state.usersPage.userSubscription,
            portionsNumber: state.usersPage.portionsNumber,
            isLoading: state.app.isLoading,
            authorizedStatus: state.app.authorizedStatus,
        }))


    useEffect(() => {
        dispatch(fetchUserData(currentPage))
    }, [currentPage])

    const usersList = users.map(item => <User key={item.id}
                                              users={item}
                                              authorizedStatus={authorizedStatus}
                                              userSubscription={userSubscription}
    />)
    if (isLoading) {
        return <Loading/>
    }

    return (
        <div>
            {usersList}
            <Pagination currentPage={currentPage}
                        totalCount={totalCount}
                        pageSize={pageSize}
                        portionsNumber={portionsNumber}
            />
        </div>
    );
};





