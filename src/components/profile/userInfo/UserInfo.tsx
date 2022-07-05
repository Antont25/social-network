import React from 'react';
import style from './userInfo.module.css'
import imgU from '../../../assest/img/1616964943_27-p-fon-priroda-30.jpg'
import {UserProfileType} from "../../../redux/profileReduser";
import {log} from "util";
import avatar from '../../../assest/img/avatar.png'
import Avatar from '@material-ui/core/Avatar';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';


type UserInfoType = {
    userProfile: UserProfileType
}
const UserInfo: React.FC<UserInfoType> = (props) => {


    return (
        <Paper elevation={3} className={style.avatarPaper}>
            <Grid container className={style.avatarBloc}>
                <Avatar className={style.img} alt="Remy Sharp" src={props.userProfile.photos.small || avatar}/>
                <div className={style.info}>
                    <div className={style.name}>{props.userProfile.fullName}</div>
                    <div>aboutMe: {props.userProfile.aboutMe || 'нету даных'}</div>
                </div>
            </Grid>

            <Grid container className={style.contacts}>
                <h2>contacts</h2>
                <Grid item className={style.contactItem}>
                    <ListItem>
                        {
                            Object.keys(props.userProfile.contacts).map(item => <ListItemText primary={item}/>)
                        }
                    </ListItem>


                    <ListItem>
                        {
                            Object.values(props.userProfile.contacts).map(item => <ListItemText
                                primary={!item && 'нету даных'}/>)

                        }
                    </ListItem>
                </Grid>

            </Grid>
        </Paper>

    )
        ;
};

export default UserInfo;