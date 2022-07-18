import React, {useEffect} from 'react';

import {connect} from "react-redux";
import {AppStoreType} from "../../redux/store";
import {Pagination} from "../../common/pagination/Pagination";
import {Loading} from "../../common/loading/Loading";
import {
    fetchFollowUserUser,
    fetchUnFollowUser,
    fetchUserData,
    follow,
    setCurrentPage,
    setPortionsNumber,
    unFollow,
    UserType
} from "../../redux/usersReducer";
// @ts-ignore
import {User} from "./User";


type MapStateToProps = {
    users: Array<UserType>
    totalCount: number
    pageSize: number
    currentPage: number
    isLoading: boolean
    authorizedCode: null | number
    portionsNumber: number
    userSubscription: Array<number>

}
type UsersType = MapStateToProps & {
    fetchUnFollowUser: (usersId: number) => void
    fetchFollowUserUser: (usersId: number) => void
    setCurrentPage: (payload: number) => void
    fetchUserData: (currentPage: number) => void
    setPortionsNumber: (payload: number) => void
}


const Users = (props: UsersType) => {
    useEffect(() => {
        props.fetchUserData(props.currentPage)
    }, [props.currentPage])

    const usersList = props.users.map(item => <User key={item.id}
                                                    users={item}
                                                    fetchUnFollowUser={props.fetchUnFollowUser}
                                                    fetchFollowUserUser={props.fetchFollowUserUser}
                                                    authorizedCode={props.authorizedCode}
                                                    userSubscription={props.userSubscription}
    />)
    if (props.isLoading) {
        return <Loading/>
    }

    return (
        <div>
            {usersList}
            <Pagination currentPage={props.currentPage}
                        totalCount={props.totalCount}
                        pageSize={props.pageSize}
                        setCurrentPage={props.setCurrentPage}
                        setPortionsNumber={props.setPortionsNumber}
                        portionsNumber={props.portionsNumber}
            />
        </div>
    );
};


function mapStateToProps(state: AppStoreType): MapStateToProps {
    return {
        users: state.usersPage.items,
        totalCount: state.usersPage.totalCount,
        pageSize: state.usersPage.pageSize,
        currentPage: state.usersPage.currentPage,
        isLoading: state.authorized.isLoading,
        portionsNumber: state.usersPage.portionsNumber,
        authorizedCode: state.authorized.authorizedCode,
        userSubscription: state.usersPage.userSubscription,
    }
}


export default connect(mapStateToProps, {
    fetchUnFollowUser,
    fetchFollowUserUser,
    setCurrentPage,
    setPortionsNumber,
    fetchUserData
})(Users);