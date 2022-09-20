import React, {useEffect} from 'react';
import {Pagination} from '../common/components/Pagination/Pagination';
import {Loading} from '../common/components/Loading/Loading';
import {fetchUserData,} from '../redux/usersReducer';
import {User} from '../components/Users/User';
import {useAppDispatch, useAppSelector} from '../common/utils/hooks/hooks';


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
export default Users





