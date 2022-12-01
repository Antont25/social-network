import React, { ReactElement } from 'react';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { Announcement, Message, MusicNote, People, Settings } from '@material-ui/icons';
import InboxIcon from '@material-ui/icons/Inbox';
import { NavLink } from 'react-router-dom';

import style from './navBar.module.css';

type NavBarProps = {
  isShowNavBarMenu?: (isShow: boolean) => void;
};

export const NavBar = ({ isShowNavBarMenu }: NavBarProps): ReactElement => {
  return (
    <div className="navbar">
      <List
        component="nav"
        aria-label="main mailbox folders"
        className={style.list}
        onClick={() => isShowNavBarMenu && isShowNavBarMenu(false)}
      >
        <ListItem button>
          <ListItemIcon>
            <InboxIcon />
          </ListItemIcon>
          <NavLink
            to="/Profile"
            className={({ isActive }) => (isActive ? style.active : style.item)}
          >
            <ListItemText primary="Profile" />
          </NavLink>
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <Message />
          </ListItemIcon>
          <NavLink
            to="/dialogs"
            className={({ isActive }) => (isActive ? style.active : style.item)}
          >
            <ListItemText primary="Messages" />
          </NavLink>
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <Announcement />
          </ListItemIcon>
          <NavLink
            to="/in-developing"
            className={({ isActive }) => (isActive ? style.active : style.item)}
          >
            <ListItemText primary="News" />
          </NavLink>
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <MusicNote />
          </ListItemIcon>
          <NavLink
            to="/in-developing"
            className={({ isActive }) => (isActive ? style.active : style.item)}
          >
            <ListItemText primary="Music" />
          </NavLink>
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <People />
          </ListItemIcon>
          <NavLink
            to="/Users"
            className={({ isActive }) => (isActive ? style.active : style.item)}
          >
            <ListItemText primary="Users" />
          </NavLink>
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <Settings />
          </ListItemIcon>
          <NavLink
            to="/in-developing"
            className={({ isActive }) => (isActive ? style.active : style.item)}
          >
            <ListItemText primary="Settings" />
          </NavLink>
        </ListItem>
      </List>
    </div>
  );
};
