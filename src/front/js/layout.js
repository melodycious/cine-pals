import React, { useContext, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";
import { BackendURL } from "./component/backendURL";
import { Home } from "./pages/home.jsx";
import injectContext, { Context } from "./store/appContext";
import { Navbar } from "./component/navbar/navbar.jsx";
import { Footer } from "./component/footer/footer.jsx";
import Profile from "./pages/profile";
import Login from "./pages/login.jsx";
import Movie from "./pages/movie.jsx";
import List from "./pages/list.jsx";
import Searcher from "./component/search/searcher.jsx";
import SerieDetail from "./pages/serie.jsx";


//create your first component
const Layout = () => {
    //the basename is used when your project is published in a subdirectory and not in the root of the domain
    // you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
    const basename = process.env.BASENAME || "";

    if(!process.env.BACKEND_URL || process.env.BACKEND_URL == "") return <BackendURL/ >;

  const{store, actions} = useContext(Context); 
 
   useEffect(() => {
        console.log(store.token);
        console.log(store.userId)
        if (!!store.token && !!store.userId){
            localStorage.setItem("token",store.token)
            localStorage.setItem("userId",store.userId)
            return 
        }
        if (localStorage.getItem("token") && localStorage.getItem("userId")){
            actions.setSession(localStorage.getItem("token"), localStorage.getItem("userId"))
        }
    },[store.token, store.userId])

    return (
        <div>
            <BrowserRouter basename={basename}>
                <ScrollToTop>
                    <Navbar />
                    <Routes>
                        <Route element={<Home />} path="/" />
                        <Route element={<Login/>} path="/login" />
                        <Route element={<Profile />} path="/profile/:id" />
                        <Route element={<List />} path="/list/:id" />
                        <Route element={<h1>Not found!</h1>} />
                        <Route path="/search" element={<Searcher />} />
                        <Route path="/movie/:id" element={<Movie />} /> 
                        <Route path="/serie/:id" element={<SerieDetail />} />   
                    </Routes>
                    <Footer />
                </ScrollToTop>
            </BrowserRouter>
        </div>
    );
};

export default injectContext(Layout);
