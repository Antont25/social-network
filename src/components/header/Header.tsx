import {AppBar, Paper} from '@material-ui/core';
import React from 'react';
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
import {NavLink} from "react-router-dom";
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import {
    AuthorizedUserType,
    setAuthorizedProfileUser,
    setAuthorizedUser,
    setIsLoading
} from "../../redux/authorizedReducer";
import {UserProfileType} from "../../redux/profileReducer";
import {showMenuHandler} from "../../redux/headerReducer";


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

const Header: React.FC<HeaderType> = (props) => {
    const classes = useStyles();


    const handlerShowMenu = () => {
        props.showMenuHandler()
    };

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);


    const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };
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
                                {props.menuIsShow
                                    ? <MenuOpen/>
                                    : <MenuIcon/>
                                }
                            </div>
                        </IconButton>
                        {props.menuIsShow &&
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
                    {props.authorizedCode === 0
                        ? <div>
                            <IconButton color="inherit"
                                        aria-label="account of current user"
                                        aria-controls="menu-appbar"
                                        aria-haspopup="true"
                                        onClick={handleMenu}>
                                {props.userFoto && <Avatar alt="Cindy Baker" src={props.userFoto}/>}
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
                                    <MenuItem onClick={handleClose}>Выйти</MenuItem>
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


let mapStateToProps = (state: AppStoreType): MapStateToPropsType => {
    return {
        menuIsShow: state.headerPage.menuIsShow,
        authorizedCode: state.authorized.authorizedCode,
        userFoto: state.authorized.authorizedProfileUser.photos.small,

    }
}

export default connect(mapStateToProps, {
    showMenuHandler,
})(Header);