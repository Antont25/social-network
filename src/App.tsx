import React, {useEffect} from 'react'
import './App.css';
import {Header} from './components/header/Header';
import NavBar from './components/navBar/NavBar';
import {Route, Routes} from 'react-router-dom';
import {Profile} from './pages/Profile';
import Dialogs from './pages/Dialogs';
import {Container, Grid, Paper,} from '@material-ui/core';
import style from './components/header/header.module.css'
import {connect} from 'react-redux';
import {AppStoreType} from './redux/store';
import Footer from './components/footer/Footer';
import {fetchAuthorizedData} from './redux/appReducer';
import {Login} from './components/login/Login';
import {Users} from './pages/Users';
import {Loading} from './components/common/loading/Loading';
import {ErrorSnackbar} from './components/common/ErrorSnackbar/ErrorSnackbar';
import {WitchRouting} from './components/WitchRouting';
import {Page404} from './components/page404/Page404';


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
        <>
            <Routes>
                <Route path="/*" element={<Container>
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
                                <div className="appWrapper">
                                    <WitchRouting/>
                                </div>
                            </Grid>
                        </Grid>
                    </div>
                    <Footer/>
                </Container>}/>
                <Route path="/not-found" element={<Page404/>}/>
            </Routes>
            <ErrorSnackbar/>
        </>
    );
}

function mapStateToProps(state: AppStoreType): MapStateToProps {
    return {
        menuIsShow: state.headerPage.menuIsShow,
        isLoading: state.app.isLoading,
    }
}

export default connect(mapStateToProps, {fetchAuthorizedData})(App);
