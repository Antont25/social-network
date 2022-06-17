import React, {useEffect} from 'react'
import './App.css';
import Header from "./components/header/Header";
import NavBar from "./components/navBar/NavBar";
import {HashRouter, Route, Routes} from "react-router-dom";
import Profile from "./components/profile/Profile";
import Dialogs from "./components/Dialogs/Dialogs";
import Users from "./components/Users/Users";
import {Container, Grid, Paper} from "@material-ui/core";
import style from './components/navBar/NavBar.module.css'
import {connect} from "react-redux";
import {AppStoreType} from "./redux/store";
import {screenWidthHandler, showMenuHandler} from "./redux/headerReduser";


type MapStateToProps = {
    menuIsShow: boolean
    screenWidth: number | null
}

type AppType = MapStateToProps & {
    showMenuHandler: () => void
    screenWidthHandler: (payload: number) => void
}

const App = (props: AppType) => {
    useEffect(() => {
        props.screenWidthHandler(window.screen.width)
        props.screenWidth && props.screenWidth > 958 && props.showMenuHandler()
        window.addEventListener('resize', () => {
            props.screenWidthHandler(window.screen.width)
            props.screenWidth && props.screenWidth > 958 && props.showMenuHandler()
        });
    }, [])

    return (
        <HashRouter>
            <Container>
                <Header/>
                <Grid container className={'container'}>
                    {props.menuIsShow &&
                        <Grid item
                              xs={12} md={3}
                              className={style.navBarMenu}
                        >
                            <Paper className={style.navBar}>
                                <NavBar menuIsShow={props.menuIsShow}
                                        showMenuHandler={props.showMenuHandler}
                                        screenWidth={props.screenWidth}
                                />
                            </Paper>
                        </Grid>
                    }
                    <Grid item xs={12} md={9}>
                        <div className='appWraper'>
                            <Routes>
                                <Route path='/'
                                       element={<Profile/>}>

                                </Route>
                                <Route path='/dialogs/*'
                                       element={<Dialogs/>}>

                                </Route>
                                <Route path='/users/'
                                       element={<Users/>}>

                                </Route>
                            </Routes>
                        </div>
                    </Grid>
                </Grid>

            </Container>
        </HashRouter>
    );
}

function mapStateToProps(state: AppStoreType): MapStateToProps {
    return {
        menuIsShow: state.headerPage.menuIsShow,
        screenWidth: state.headerPage.screenWidth
    }
}

export default connect(mapStateToProps, {showMenuHandler, screenWidthHandler})(App);
