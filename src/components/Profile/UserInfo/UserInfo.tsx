import React, {useState} from 'react';
import style from './userInfo.module.css'
import avatar from '../../../assest/img/avatar.png'
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import {UserProfileType} from '../../../api/api';
import {useAppDispatch} from '../../../utils/hooks/hooks';
import {fetchStatusUpdates, updateContacts} from '../../../redux/profileReducer';
import {AvatarUser} from './Avatar/AvatarUser';
import Button from '../../common/Button/Button';
import {FormContacts} from './FormContacts/FormContacts';
import {EditMode} from '../../EditMode/EditMode';


type UserInfoType = {
    userProfile: UserProfileType
    authorizedUserId: number | null
    userStatus: string | null

}
const UserInfo: React.FC<UserInfoType> = (props) => {

    const dispatch = useAppDispatch()

    const [editMode, setEditMode] = useState(false)

    const isOwner = props.authorizedUserId === props.userProfile.userId

    const setStatusHandler = (value: string) => {
        dispatch(fetchStatusUpdates(value, props.userProfile.userId))
    }
    const editModeHandler = () => {
        setEditMode(!editMode)
    }

    const saveNameHandler = (fullName: string) => {
        dispatch(updateContacts(undefined, fullName))
    }

    const closedEditMode = () => {
        setEditMode(false)
    }


    return (
        <Paper elevation={3} className={style.avatarPaper}>
            <Grid container className={style.avatarBloc}>

                <AvatarUser src={props.userProfile.photos.small || avatar}/>

                <div className={style.info}>
                    <div className={style.name}>
                        <EditMode value={props.userProfile.fullName}
                                  isOwner={isOwner}
                                  callback={saveNameHandler}
                                  label={'name'}
                                  length={10}/>
                    </div>

                    <div className={style.statusBloc}>
                        <span>Статус:</span>
                        <EditMode value={props.userStatus}
                                  callback={setStatusHandler}
                                  isOwner={isOwner}
                                  label={'status'}
                                  length={80}/>

                    </div>
                </div>
            </Grid>

            <Grid container className={style.contacts}>
                <h2>contacts</h2>
                <Grid item className={style.contactItem}>
                    {editMode
                        ? <FormContacts setEditMode={setEditMode}
                                        closedEditMode={closedEditMode}/>
                        : <>
                            <ListItem>
                                {
                                    Object.keys(props.userProfile.contacts).map((item, index) => <ListItemText
                                        className={style.contactHeader}
                                        key={index}
                                        primary={`${item}:`}/>)
                                }
                            </ListItem>


                            <ListItem>
                                {
                                    Object.values(props.userProfile.contacts).map((item, index) => <ListItemText
                                        className={style.contactBody}
                                        key={index}
                                        primary={item || 'нету даных'}/>
                                    )

                                }
                            </ListItem>
                        </>
                    }

                </Grid>
                {isOwner && !editMode &&
                    <Button className={style.btn} onClick={editModeHandler}>редактировать форму</Button>}
            </Grid>
        </Paper>

    )
};

export default UserInfo;


