import React from 'react';
import style from './userInfo.module.css'
import imgU from '../../../img/1616964943_27-p-fon-priroda-30.jpg'
const UserInfo = () => {
    return (
        <div>
            <div className={style.imgUser}>
                <img src={imgU}/>
                <span>NAME</span>
                <div>lern100</div>
            </div>
        </div>
    );
};

export default UserInfo;