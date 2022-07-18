import React, {useEffect} from 'react';

import {connect} from "react-redux";
import {AppStoreType} from "../../redux/store";
import {Pagination} from "../../common/pagination/Pagination";
import {Loading} from "../../common/loading/Loading";
import {fetchUserData, follow, setCurrentPage, setPortionsNumber, unFollow, UserType} from "../../redux/usersReducer";
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

}
type UsersType = MapStateToProps & {
    follow: (id: number) => void
    unFollow: (id: number) => void
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
                                                    unFollow={props.unFollow}
                                                    follow={props.follow}
                                                    authorizedCode={props.authorizedCode}
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
    }
}


export default connect(mapStateToProps, {
    follow,
    unFollow,
    setCurrentPage,
    setPortionsNumber,
    fetchUserData
})(Users);