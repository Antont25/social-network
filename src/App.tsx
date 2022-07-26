import React, {useEffect} from 'react'
import './App.css';
import {Header} from "./components/header/Header";
import NavBar from "./components/navBar/NavBar";
import {HashRouter, Route, Routes} from "react-router-dom";
import Profile from "./components/profile/Profile";
import Dialogs from "./components/Dialogs/Dialogs";
import {Container, Grid, Paper,} from "@material-ui/core";
import style from './components/header/header.module.css'
import {connect} from "react-redux";
import {AppStoreType} from "./redux/store";
import Footer from "./components/footer/Footer";
import {fetchAuthorizedData} from "./redux/authorizedReducer";
import {Login} from "./components/login/Login";
import Users from "./components/Users/Users";
import {Loading} from "./components/loading/Loading";


type MapStateToProps = {
    menuIsShow: boolean
    isLoading: boolean
}
type AppType = MapStateToProps & {
    fetchAuthorizedData: () => void
}


const App = (props: AppType) => {


    useEffect(() => {
        props.fetchAuthorizedData()
    }, [])


    // if (props.isLoading) {
    //     return <Loading/>
    // }

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
                            <div className='appWrapper'>
                                <Routes>
                                    <Route path='/'
                                           element={<Profile/>}>
                                        <Route path='/profile/*' element={<Profile/>}/>
                                    </Route>
                                    <Route path='/dialogs/*'
                                           element={<Dialogs/>}>
                                    </Route>
                                    <Route path='/users/'
                                           element={<Users/>}>
                                    </Route>
                                    <Route path='/login/'
                                           element={<Login/>}>
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
        isLoading: state.authorized.isLoading,
    }
}

export default connect(mapStateToProps, {fetchAuthorizedData})(App);
