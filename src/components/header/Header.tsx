import {AppBar, Paper} from '@material-ui/core';
import React from 'react';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import imgIcon from '../../img/logo.png'
import {MenuOpen} from "@material-ui/icons";
import style from './header.module.css'
import {showMenuHandler} from "../../redux/headerReduser";
import {connect} from "react-redux";
import {AppStoreType} from "../../redux/store";
import NavBar from "../navBar/NavBar";


type MapStateToPropsType = {
    menuIsShow: boolean
    isLoading: boolean
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
                    {
                        props.isLoading && (
                            <div>
                                <IconButton color="inherit">
                                    <AccountCircle/>
                                </IconButton>
                            </div>
                        )
                    }
                </Toolbar>
            </AppBar>
        </div>

    )

};


let mapStateToProps = (state: AppStoreType): MapStateToPropsType => {
    return {
        menuIsShow: state.headerPage.menuIsShow,
        isLoading: state.loading.isLoading
    }
}

export default connect(mapStateToProps, {showMenuHandler})(Header);