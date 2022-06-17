import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import avatar from '../../img/ava.jpeg'
import {Button, Grid, Paper} from "@material-ui/core";
import style from './users.module.css'
import {UserType} from "../../redux/usersReduser";


type UserFCType = {
    users: UserType
    follow: (id: number) => void
    unFollow: (id: number) => void
}
const User: React.FC<UserFCType> = (props) => {

    function onClickFollowedHandler() {
        if (props.users.followed) {
            props.unFollow(props.users.id)
        } else {
            props.follow(props.users.id)
        }
    }

    return (
        <div>
            <Paper elevation={3}>
                <Grid container className={style.user}>
                    <Grid item md={2} className={style.userBlock}>
                        <Avatar className={style.avatar} alt="Remy Sharp" src={avatar}/>
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
                        <div>Имя: {props.users.name}</div>
                        <div>Статус: {props.users.status ? props.users.status : 'нет статуса'}</div>
                    </Grid>
                </Grid>
            </Paper>


        </div>
    )
        ;
};

export default User;