import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton/IconButton';
import React, {ChangeEvent} from 'react';
import style from '../userInfo.module.css';
import {PhotoCamera} from '@material-ui/icons';
import {useAppDispatch} from '../../../../utils/hooks/hooks';
import {updateAvatar} from '../../../../redux/profileReducer';


type AvatarParams = {
    src: string
};
export const AvatarUser = (props: AvatarParams) => {

    const dispatch = useAppDispatch()

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length) {
            dispatch(updateAvatar(e.target.files[0]))
        }
    }

    return (
        <div className={style.avaBlock}>
            <Avatar className={style.img} alt="Remy Sharp"
                    src={props.src}/>
            <div className={style.loadBtn}>
                <input accept="image/*"
                       style={{display: 'none'}}
                       id="icon-button-file"
                       type="file"
                       onChange={onChangeHandler}/>
                <label htmlFor="icon-button-file">
                    <IconButton color="primary"
                                aria-label="upload picture"
                                component="span"
                    >
                        <PhotoCamera/>
                    </IconButton>
                </label>
            </div>

        </div>
    );
};

