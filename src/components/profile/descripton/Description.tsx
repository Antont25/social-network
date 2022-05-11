import React from 'react';
import imgFon from '../../../img/1616964943_27-p-fon-priroda-30.jpg'
import style from './description.module.css'
export const Description = () => {
    return (
        <div>
            <img className={style.foto} src={imgFon}/>
        </div>
    );
};

