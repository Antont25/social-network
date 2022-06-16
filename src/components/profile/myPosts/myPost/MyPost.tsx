import React from 'react';
import style from './MyPost.module.css'
import ava from '../../../../img/ava.jpeg'

type MyPostPropsType = {
    massage: string
    likes: number
}


export const MyPost: React.FC<MyPostPropsType> = ({massage, likes}) => {

    return (
        <div>
            <img className={style.img} src={ava}/>
            <span>{massage}</span>
            <div>liks {likes}</div>
        </div>
    );
};

