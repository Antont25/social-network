import {AppBar, Paper} from '@material-ui/core';
import React, {useCallback, useEffect, useRef} from 'react';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import imgIcon from '../../assest/img/logo.png'
import {MenuOpen} from '@material-ui/icons';
import style from './header.module.css'
import NavBar from '../navBar/NavBar';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import {NavLink, useNavigate} from 'react-router-dom';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import {fetchLogout} from '../../redux/appReducer';
import {showMenuHandler} from '../../redux/headerReducer';
import {useAppDispatch, useAppSelector} from '../../utils/hooks/hooks';


type HeaderType = {
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
        const dispatch = useAppDispatch()
        const classes = useStyles();

        const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
        const open = Boolean(anchorEl);

        const ref = useRef<HTMLInputElement | null>(null)

        const authorizedStatus = useAppSelector(state => state.app.authorizedStatus)
        const userFoto = useAppSelector(state => state.app.authorizedProfileUser.photos.small)
        const menuIsShow = useAppSelector(state => state.headerPage.menuIsShow)

        const navigate = useNavigate()

        const isShowNavBarMenu = useCallback((isShow: boolean) => {
            dispatch(showMenuHandler(isShow))
        }, [dispatch]);

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


        function navBarMenuClicked(event: any) {
            let path = event.path || (event.composedPath && event.composedPath())
            if (!path.includes(ref.current)) {
                isShowNavBarMenu && isShowNavBarMenu(false)
            }
        }

        useEffect(() => {
            let navbar = document.getElementById('navBarMenu')
            navbar && navbar.addEventListener('click', navBarMenuClicked)
            console.log('start')
            return () => {
                navbar && navbar.removeEventListener('click', navBarMenuClicked)
                console.log('closed')

            }
        }, [menuIsShow])

        useEffect(() => {
            if (authorizedStatus === 'fail') navigate('/')
        }, [authorizedStatus])

        return (
            <div className={classes.root}>
                <AppBar position="static">
                    <Toolbar>
                        <div className={style.menuBlock}>
                            <IconButton edge="start"
                                        className={classes.menuButton}
                                        color="inherit"
                                        onClick={() => isShowNavBarMenu(!menuIsShow)}
                            >
                                <div>
                                    {menuIsShow
                                        ? <MenuOpen/>
                                        : <MenuIcon/>
                                    }
                                </div>
                            </IconButton>
                            {menuIsShow &&
                                <div id={'navBarMenu'} className={style.navBarMenu}>
                                    <Paper ref={ref} className={style.navBar}>
                                        <NavBar isShowNavBarMenu={isShowNavBarMenu}
                                        />
                                    </Paper>
                                </div>
                            }
                        </div>
                        <Typography className={classes.title}>
                            <img style={{height: '20px'}} src={imgIcon} alt=""/>
                        </Typography>
                        {authorizedStatus === 'successfully'
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

    }
;


