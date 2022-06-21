import React, {useEffect} from 'react';
import User from "./User";
import {connect} from "react-redux";
import {follow, InitialStateUserPageType, setUsers, unFollow, UserType} from "../../redux/usersReduser";
import {AppStoreType} from "../../redux/store";
import axios from "axios";


type MapStateToProps = {
    users: Array<UserType>
}
type UsersType = MapStateToProps & {
    follow: (id: number) => void
    unFollow: (id: number) => void
    setUsers: (id: Array<UserType>) => void
}


const Users = (props: UsersType) => {
    useEffect(() => {
        axios.get<InitialStateUserPageType>('https://social-network.samuraijs.com/api/1.0/users').then((response) => {
            console.log(response)
            props.setUsers(response.data.items)
        })
    }, [])

    const usersList = props.users.map(item => <User key={item.id}
                                                    users={item}
                                                    unFollow={props.unFollow}
                                                    follow={props.follow}
    />)

    return (
        <div>
            {usersList}

        </div>
    );
};


function mapStateToProps(state: AppStoreType): MapStateToProps {
    return {
        users: state.usersPage.items
    }
}


export default connect(mapStateToProps, {follow, unFollow, setUsers})(Users);