import React, {useEffect} from 'react';
import style from './NavBar.module.css'
import {NavLink} from 'react-router-dom'

type NavBarProps = {
    menuIsShow: boolean
    screenWidth: number | null
    showMenuHandler: () => void
}

const NavBar = (props: NavBarProps) => {
    function onclickMenuHandler() {
        if (props.screenWidth && props.screenWidth < 958) {
            props.showMenuHandler()
        }
    }


    return (
        <div className={'navbar'}>
            <ul className={style.list} onClick={onclickMenuHandler}>
                <li><NavLink to={'/'}
                             className={(({isActive}) => isActive ? style.active : style.item)}>Profile</NavLink></li>
                <li><NavLink to={'/dialogs'}
                             className={(({isActive}) => isActive ? style.active : style.item)}>Messages</NavLink></li>
                <li><NavLink to={'/news'}
                             className={(({isActive}) => isActive ? style.active : style.item)}>News</NavLink></li>
                <li><NavLink to={'/music'}
                             className={(({isActive}) => isActive ? style.active : style.item)}>Music</NavLink></li>
                <li><NavLink to={'/users'}
                             className={(({isActive}) => isActive ? style.active : style.item)}>Users</NavLink></li>
                <li><NavLink to={'/setings'}
                             className={(({isActive}) => isActive ? style.active : style.item)}>Settings</NavLink></li>
            </ul>
        </div>
    );
};


export default NavBar;

