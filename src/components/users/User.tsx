import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import avatar from '../../assest/img/avatar.png'
import {Button, Grid, Paper} from "@material-ui/core";
import style from './users.module.css'
import {UserType} from "../../redux/usersReduser";
import {NavLink} from "react-router-dom";
import {api} from "../../api/api";


type UserFCType = {
    users: UserType
    follow: (id: number) => void
    unFollow: (id: number) => void
}
const User: React.FC<UserFCType> = (props) => {

    function onClickFollowedHandler(e: any) {
        if (props.users.followed) {
            api.unFollowUser(props.users.id).then(response => {
                if (response.resultCode === 0) {
                    props.unFollow(props.users.id)
                }
            })
        } else {
            api.followUser(props.users.id).then(response => {
                if (response.resultCode === 0) {
                    props.follow(props.users.id)
                }
            })


        }
    }

    return (
        <div>
            <Paper elevation={3}>
                <Grid container className={style.user}>
                    <Grid item md={2} className={style.userBlock}>
                        <NavLink to={'/profile'}>
                            <Avatar className={style.avatar} alt="Remy Sharp" src={props.users.photos.small || avatar}/>
                        </NavLink>
                        <Button className={style.button}
                                variant="outlined"
                                color="primary"
                                size={"small"}
                                onClick={onClickFollowedHandler}
                        >
                            {props.users.followed ? "Отписаться" : "Подписаться"}
                        </Button>
                    </Grid>
                    <Grid item md={10} className={style.userInfo}>
                        <NavLink to={`/profile/${props.users.id}`}>
                            <div className={style.userName}>{props.users.name}</div>
                        </NavLink>
                        <div>Статус: {props.users.status ? props.users.status : 'нет статуса'}</div>
                    </Grid>
                </Grid>
            </Paper>
        </div>
    )
        ;
};

export default User;