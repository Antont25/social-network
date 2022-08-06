import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import avatar from '../../assest/img/avatar.png'
import {Button, Grid, Paper} from "@material-ui/core";
import style from './users.module.css'
import {NavLink} from "react-router-dom";
import {StatusAuthorizedType} from "../../redux/authorizedReducer";
import {UserType} from "../../api/api";


type UserFCType = {
    users: UserType
    authorizedStatus: StatusAuthorizedType
    fetchUnFollowUser: (usersId: number) => void
    fetchFollowUser: (usersId: number) => void
    userSubscription: Array<number>
}
export const User: React.FC<UserFCType> = (props) => {

    function onClickFollowedHandler() {
        if (props.users.followed) {
            props.fetchUnFollowUser(props.users.id)
        } else {
            props.fetchFollowUser(props.users.id)
        }


    }


    return (
        <div>
            <Paper elevation={3}>
                <Grid container className={style.user}>
                    <Grid item md={2} className={style.userBlock}>
                        <NavLink to={`/profile/${props.users.id}`}>
                            <Avatar className={style.avatar} alt="Remy Sharp" src={props.users.photos.small || avatar}/>
                        </NavLink>
                        <Button className={style.button}
                                variant="outlined"
                                color="primary"
                                size={"small"}
                                disabled={props.authorizedStatus === 'fail' || props.userSubscription.some(item => item === props.users.id)}
                                onClick={onClickFollowedHandler}
                        >
                            {props.users.followed ? "Отписаться" : "Подписаться"}
                        </Button>
                    </Grid>
                    <Grid item md={10} className={style.userInfo}>
                        <NavLink to={`/profile/${props.users.id}`}>
                            <div className={style.userName}>{props.users.name}</div>
                        </NavLink>
                        <div>Информация про меня: {props.users.status ? props.users.status : 'нету данных'}</div>
                    </Grid>
                </Grid>
            </Paper>
        </div>
    )
        ;
};

