import React, { ReactElement, useCallback, useEffect, useRef, useState } from 'react';

import { AppBar, Paper } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { MenuOpen } from '@material-ui/icons';
import MenuIcon from '@material-ui/icons/Menu';
import { NavLink, useNavigate } from 'react-router-dom';

import style from './header.module.css';

import imgIcon from 'assest/img/logo.png';
import { NavBar } from 'components/Header/NavBar';
import { useAppDispatch, useAppSelector } from 'hooks';
import { fetchLogout } from 'redux/appSlice';
import { showMenuHandler } from 'redux/headerReducer';
import { getAuthorizedStatus, getMenuIsShow, getPhotosSmall } from 'selectors';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      position: 'relative',
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
  }),
);

export const Header = (): ReactElement => {
  const navigate = useNavigate();
  const classes = useStyles();

  const dispatch = useAppDispatch();

  const ref = useRef<HTMLInputElement | null>(null);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const open = Boolean(anchorEl);

  const authorizedStatus = useAppSelector(getAuthorizedStatus);
  const userFoto = useAppSelector(getPhotosSmall);
  const menuIsShow = useAppSelector(getMenuIsShow);

  const isShowNavBarMenu = useCallback(
    (isShow: boolean) => {
      dispatch(showMenuHandler(isShow));
    },
    [dispatch],
  );

  const onMenuClick = (event: React.MouseEvent<HTMLElement>): void => {
    setAnchorEl(event.currentTarget);
  };

  const onCloseClick = (): void => {
    setAnchorEl(null);
  };

  const onLogoutClick = (): void => {
    onCloseClick();
    dispatch(fetchLogout());
  };

  const onNavBarMenuClick = (event: any): void => {
    const path = event.path || (event.composedPath && event.composedPath());

    if (!path.includes(ref.current) && isShowNavBarMenu) {
      isShowNavBarMenu(false);
    }
  };

  useEffect(() => {
    const navbar = document.getElementById('navBarMenu');

    // eslint-disable-next-line no-unused-expressions
    navbar && navbar.addEventListener('click', onNavBarMenuClick);

    return () => {
      // eslint-disable-next-line no-unused-expressions
      navbar && navbar.removeEventListener('click', onNavBarMenuClick);
    };
  }, [menuIsShow]);

  useEffect(() => {
    if (authorizedStatus === 'fail') navigate('/');
  }, [authorizedStatus]);

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <div className={style.menuBlock}>
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              onClick={() => isShowNavBarMenu(!menuIsShow)}
            >
              <div>{menuIsShow ? <MenuOpen /> : <MenuIcon />}</div>
            </IconButton>
            {menuIsShow && (
              <div id="navBarMenu" className={style.navBarMenu}>
                <Paper ref={ref} className={style.navBar}>
                  <NavBar isShowNavBarMenu={isShowNavBarMenu} />
                </Paper>
              </div>
            )}
          </div>
          <Typography className={classes.title}>
            <img style={{ height: '20px' }} src={imgIcon} alt="" />
          </Typography>
          {authorizedStatus === 'successfully' ? (
            <div>
              <IconButton
                color="inherit"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={onMenuClick}
              >
                {userFoto && <Avatar alt="Cindy Baker" src={userFoto} />}
              </IconButton>
              <Menu
                className={style.menu}
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'bottom',
                  horizontal: 'center',
                }}
                open={open}
                onClose={onCloseClick}
              >
                <NavLink to="/Profile">
                  <MenuItem onClick={onCloseClick}>Мой профиль</MenuItem>
                </NavLink>
                <NavLink to="/Profile">
                  <MenuItem onClick={onLogoutClick}>Выйти</MenuItem>
                </NavLink>
              </Menu>
            </div>
          ) : (
            <NavLink to="/Login">
              <Button color="inherit">Login</Button>
            </NavLink>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
};
