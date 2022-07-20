import {AppBar, Paper} from '@material-ui/core';
import React, {useEffect} from 'react';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import imgIcon from '../../assest/img/logo.png'
import {MenuOpen} from "@material-ui/icons";
import style from './header.module.css'

import {connect} from "react-redux";
import {AppStoreType} from "../../redux/store";
import NavBar from "../navBar/NavBar";
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import {NavLink, useNavigate} from "react-router-dom";
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import {fetchLogout} from "../../redux/authorizedReducer";
import {showMenuHandler} from "../../redux/headerReducer";
import {useAppDispatch, useAppSelector} from "../../redux/app/hooks";


type MapStateToPropsType = {
    menuIsShow: boolean
    authorizedCode: null | number
    userFoto: string | null | undefined
}
type HeaderType = MapStateToPropsType & {
    showMenuHandler: () => void
}


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

export const Header: React.FC = () => {
    const classes = useStyles();
    const {authorizedCode, userFoto, menuIsShow} = useAppSelector(state => ({
        authorizedCode: state.authorized.authorizedCode,
        userFoto: state.authorized.authorizedProfileUser.photos.small,
        menuIsShow: state.headerPage.menuIsShow,
    }))
    const navigate = useNavigate()
    useEffect(() => {
        if (authorizedCode === 1) navigate('/')
    }, [authorizedCode])

    const dispatch = useAppDispatch()

    const handlerShowMenu = () => {
        showMenuHandler()
    };

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);


    const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    function onclickLogoutHandler() {
        handleClose()
        dispatch(fetchLogout())
    }

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <div className={style.menuBlock}>
                        <IconButton edge="start"
                                    className={classes.menuButton}
                                    color="inherit"
                                    onClick={handlerShowMenu}
                        >
                            <div>
                                {menuIsShow
                                    ? <MenuOpen/>
                                    : <MenuIcon/>
                                }
                            </div>
                        </IconButton>
                        {menuIsShow &&
                            <div className={style.navBarMenu}>
                                <Paper className={style.navBar}>
                                    <NavBar handlerShowMenu={handlerShowMenu}/>
                                </Paper>
                            </div>
                        }
                    </div>
                    <Typography className={classes.title}>
                        <img style={{height: '20px'}} src={imgIcon} alt=""/>
                    </Typography>
                    {authorizedCode === 0
                        ? <div>
                            <IconButton color="inherit"
                                        aria-label="account of current user"
                                        aria-controls="menu-appbar"
                                        aria-haspopup="true"
                                        onClick={handleMenu}>
                                {userFoto && <Avatar alt="Cindy Baker" src={userFoto}/>}
                            </IconButton>
                            <Menu className={style.menu}
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
                                  onClose={handleClose}
                            >
                                <NavLink to={'/profile'}>
                                    <MenuItem onClick={handleClose}>Мой рофиль</MenuItem>
                                </NavLink>
                                <NavLink to={'/profile'}>
                                    <MenuItem onClick={onclickLogoutHandler}>Выйти</MenuItem>
                                </NavLink>

                            </Menu>
                        </div>
                        : <NavLink to={'/login'}>
                            <Button color="inherit">Login</Button>
                        </NavLink>
                    }
                </Toolbar>
            </AppBar>
        </div>

    )

};


