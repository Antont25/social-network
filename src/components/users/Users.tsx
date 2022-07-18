import React, {useEffect} from 'react';
import User from "./User";
import {connect} from "react-redux";
import {
    FetchUserType,
    follow,
    setCurrentPage,
    setPortionsNumber,
    setUsers,
    unFollow,
    UserType
} from "../../redux/usersReduser";
import {AppStoreType} from "../../redux/store";
import {Pagination} from "../../common/pagination/Pagination";
import {Loading} from "../../common/loading/Loading";
import {setIsLoading} from "../../redux/authorizedReduser";
import {api} from "../../api/api";


type MapStateToProps = {
    users: Array<UserType>
    totalCount: number
    pageSize: number
    currentPage: number
    isLoading: boolean
    portionsNumber: number

}
type UsersType = MapStateToProps & {
    follow: (id: number) => void
    unFollow: (id: number) => void
    setUsers: (payload: FetchUserType) => void
    setCurrentPage: (payload: number) => void
    setIsLoading: (payload: boolean) => void
    setPortionsNumber: (payload: number) => void
}


const Users = (props: UsersType) => {
    useEffect(() => {
        async function fetchUser() {
            props.setIsLoading(true)
            let response = await api.getUser(props.currentPage)
            props.setUsers(response)
            props.setIsLoading(false)
        }

        fetchUser()
    }, [props.currentPage])

    const usersList = props.users.map(item => <User key={item.id}
                                                    users={item}
                                                    unFollow={props.unFollow}
                                                    follow={props.follow}
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
    }
}


export default connect(mapStateToProps, {
    follow,
    unFollow,
    setUsers,
    setCurrentPage,
    setIsLoading,
    setPortionsNumber
})(Users);