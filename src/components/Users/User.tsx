import React from "react";
import Avatar from "@material-ui/core/Avatar";
import avatar from "../../assest/img/avatar.png"
import {Button, Grid, Paper} from "@material-ui/core";
import style from "./users.module.css"
import {NavLink} from "react-router-dom";
import {useAppDispatch} from "../../common/utils/hooks/hooks";
import {fetchFollowUser, fetchUnFollowUser} from "../../redux/usersSlice";
import {UserType} from "../../api/api";
import {StatusAuthorizedType} from "../../redux/appSlice";


export const User = React.memo(( props: UserFCType ) => {
  const dispatch = useAppDispatch()

  const onClickFollowedHandler = () => {
    if (props.users.followed) {
      dispatch(fetchUnFollowUser(props.users.id))
    } else {
      dispatch(fetchFollowUser(props.users.id))
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
                    disabled={props.authorizedStatus === "fail" || props.userSubscription.some(item => item === props.users.id)}
                    onClick={onClickFollowedHandler}
            >
              {props.users.followed ? "Отписаться" : "Подписаться"}
            </Button>
          </Grid>
          <Grid item md={10} className={style.userInfo}>
            <NavLink to={`/profile/${props.users.id}`}>
              <div className={style.userName}>{props.users.name}</div>
            </NavLink>
            <div>Информация про
              пользователя: {props.users.status ? props.users.status : "нету данных"}</div>
          </Grid>
        </Grid>
      </Paper>
    </div>
  )
});
//type
type UserFCType = {
  users: UserType
  authorizedStatus: StatusAuthorizedType
  userSubscription: Array<number>
}

