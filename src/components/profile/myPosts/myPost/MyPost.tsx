import React from 'react';
import style from './MyPost.module.css'


type MyPostPropsType={
    massage:string
    likes:number
}


export const MyPost: React.FC<MyPostPropsType> = ({massage,likes}) => {

    return (
        <div>
            <img className={style.img} src={'https://slovnet.ru/wp-content/uploads/2019/01/2-2.jpeg'}/>
            <span>{massage}</span>
            <div>liks {likes}</div>
        </div>
    );
};

