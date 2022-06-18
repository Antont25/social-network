import React from 'react'
import './App.css';
import Header from "./components/header/Header";
import NavBar from "./components/navBar/NavBar";
import {HashRouter, Route, Routes} from "react-router-dom";
import Profile from "./components/profile/Profile";
import Dialogs from "./components/Dialogs/Dialogs";
import Users from "./components/Users/Users";
import {Container, Grid, Paper,} from "@material-ui/core";
import style from './components/header/header.module.css'
import {connect} from "react-redux";
import {AppStoreType} from "./redux/store";
import {showMenuHandler} from "./redux/headerReduser";
import Footer from "./components/Footer/Footer";


type MapStateToProps = {
    menuIsShow: boolean
}
type AppType = MapStateToProps & {
    showMenuHandler: () => void
}


const App = (props: AppType) => {


    return (
        <HashRouter>
            <Container>
                <Header/>
                <div className={'containerBorder'}>
                    <Grid container spacing={2} className={'container'}>
                        <Grid item
                              sm={4} md={3}
                              className={'navBarApp'}
                        >
                            <Paper className={style.navBar}>
                                <NavBar/>
                            </Paper>
                        </Grid>
                        <Grid item xs={12} sm={8} md={9}>
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
                </div>
                <Footer/>
            </Container>
        </HashRouter>
    );
}

function mapStateToProps(state: AppStoreType): MapStateToProps {
    return {
        menuIsShow: state.headerPage.menuIsShow,
    }
}

export default connect(mapStateToProps, {showMenuHandler})(App);
