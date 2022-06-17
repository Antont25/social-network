import React from 'react';
import User from "./User";
import {connect} from "react-redux";
import {follow, unFollow, UserType} from "../../redux/usersReduser";
import {AppStoreType} from "../../redux/store";


type MapStateToProps = {
    users: Array<UserType>
}
type UsersType = MapStateToProps & {
    follow: (id: number) => void
    unFollow: (id: number) => void
}


const Users = (props: UsersType) => {
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
        users: state.usersPage.users
    }
}


export default connect(mapStateToProps, {follow, unFollow})(Users);