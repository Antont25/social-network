import React, { ReactElement, useState } from 'react';

import Grid from '@material-ui/core/Grid';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Paper from '@material-ui/core/Paper';

import { AvatarUser } from './Avatar/AvatarUser';
import { FormContacts } from './FormContacts/FormContacts';
import style from './userInfo.module.css';

import avatar from 'assest/img/avatar.png';
import Button from 'common/components/Button/Button';
import { EditMode } from 'common/components/EditMode/EditMode';
import { useAppDispatch } from 'common/utils/hooks/hooks';
import { fetchStatusUpdates, updateDateProfile } from 'redux/profileSlice';
import { UserProfileType } from 'type';

const UserInfo = ({
  authorizedUserId,
  userProfile,
  userStatus,
}: UserInfoType): ReactElement => {
  const dispatch = useAppDispatch();

  const [editMode, setEditMode] = useState(false);

  const isOwner = authorizedUserId === userProfile.userId;

  const setStatusHandler = (value: string): void => {
    dispatch(fetchStatusUpdates(value, userProfile.userId));
  };
  const editModeHandler = (): void => {
    setEditMode(!editMode);
  };

  const saveNameHandler = (fullName: string): void => {
    dispatch(updateDateProfile(undefined, fullName));
  };

  const closedEditMode = (): void => {
    setEditMode(false);
  };

  return (
    <Paper elevation={3} className={style.avatarPaper}>
      <Grid container className={style.avatarBloc}>
        <AvatarUser src={userProfile.photos.small || avatar} />

        <div className={style.info}>
          <div className={style.name}>
            <EditMode
              value={userProfile.fullName}
              isOwner={isOwner}
              callback={saveNameHandler}
              label="name"
              length={10}
            />
          </div>

          <div className={style.statusBloc}>
            <span>Статус:</span>
            <EditMode
              value={userStatus}
              callback={setStatusHandler}
              isOwner={isOwner}
              label="status"
              length={80}
            />
          </div>
        </div>
      </Grid>

      <Grid container className={style.contacts}>
        <h2>contacts</h2>
        <Grid item className={style.contactItem}>
          {editMode ? (
            <FormContacts setEditMode={setEditMode} closedEditMode={closedEditMode} />
          ) : (
            <>
              <ListItem>
                {Object.keys(userProfile.contacts).map((item, index) => (
                  <ListItemText
                    className={style.contactHeader}
                    /* eslint-disable-next-line react/no-array-index-key */
                    key={index}
                    primary={`${item}:`}
                  />
                ))}
              </ListItem>

              <ListItem>
                {Object.values(userProfile.contacts).map((item, index) => (
                  <ListItemText
                    className={style.contactBody}
                    /* eslint-disable-next-line react/no-array-index-key */
                    key={index}
                    primary={item || 'нету даных'}
                  />
                ))}
              </ListItem>
            </>
          )}
        </Grid>
        {isOwner && !editMode && (
          <Button className={style.btn} onClick={editModeHandler}>
            редактировать форму
          </Button>
        )}
      </Grid>
    </Paper>
  );
};

export default UserInfo;
// type
type UserInfoType = {
  userProfile: UserProfileType;
  authorizedUserId: number | null;
  userStatus: string | null;
};
