import React from 'react';
import style from './myPost.module.css'
import Paper from '@material-ui/core/Paper';
import Avatar from '@material-ui/core/Avatar';
import avatar from '../../../../assest/img/avatar.png';
import FavoriteIcon from '@material-ui/icons/Favorite';
import IconButton from '@material-ui/core/IconButton';


export const MyPost: React.FC<MyPostPropsType> = ({massage, likes, photoUser}) => {

    return (
        <Paper className={style.postBloc}>
            <Avatar className={style.img} alt="Remy Sharp" src={photoUser || avatar}/>
            <div className={style.post}>
                <span>{massage}</span>

                <div className={style.likesBloc}>
                    <IconButton color="secondary" size={'small'}>
                        <FavoriteIcon/>
                        <span className={style.likes}>{likes}</span>

                    </IconButton>
                </div>
            </div>
        </Paper>
    );
};
//type
type MyPostPropsType = {
    massage: string
    likes: number
    photoUser: string | null
}


