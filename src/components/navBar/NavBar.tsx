import React from 'react';
import style from './NavBar.module.css'
import {NavLink} from 'react-router-dom'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/Inbox';
import {Announcement, Message, MusicNote, People, Settings} from '@material-ui/icons';

type NavBarProps = {
    isShowNavBarMenu?: (isShow: boolean) => void

}


const NavBar = (props: NavBarProps) => {
    
    return (
        <div className={'navbar'}>
            <List component="nav" aria-label="main mailbox folders" className={style.list}
                  onClick={() => props.isShowNavBarMenu && props.isShowNavBarMenu(false)}
            >
                <ListItem button>
                    <ListItemIcon>
                        <InboxIcon/>
                    </ListItemIcon>
                    <NavLink to={'/profile'}
                             className={(({isActive}) => isActive ? style.active : style.item)}>
                        <ListItemText primary="Profile"/>
                    </NavLink>
                </ListItem>
                <ListItem button>
                    <ListItemIcon>
                        <Message/>
                    </ListItemIcon>
                    <NavLink to={'/dialogs'}
                             className={(({isActive}) => isActive ? style.active : style.item)}>
                        <ListItemText primary="Messages"/>
                    </NavLink>
                </ListItem>
                <ListItem button>
                    <ListItemIcon>
                        <Announcement/>
                    </ListItemIcon>
                    <NavLink to={'/news'}
                             className={(({isActive}) => isActive ? style.active : style.item)}>
                        <ListItemText primary="News"/>
                    </NavLink>
                </ListItem>
                <ListItem button>
                    <ListItemIcon>
                        <MusicNote/>
                    </ListItemIcon>
                    <NavLink to={'/music'}
                             className={(({isActive}) => isActive ? style.active : style.item)}>
                        <ListItemText primary="Music"/>
                    </NavLink>
                </ListItem>
                <ListItem button>
                    <ListItemIcon>
                        <People/>
                    </ListItemIcon>
                    <NavLink to={'/users'}
                             className={(({isActive}) => isActive ? style.active : style.item)}>
                        <ListItemText primary="Users"/>
                    </NavLink>
                </ListItem>
                <ListItem button>
                    <ListItemIcon>
                        <Settings/>
                    </ListItemIcon>
                    <NavLink to={'/settings'}
                             className={(({isActive}) => isActive ? style.active : style.item)}>
                        <ListItemText primary="Settings"/>
                    </NavLink>
                </ListItem>
            </List>
        </div>
    );
}


export default NavBar;

