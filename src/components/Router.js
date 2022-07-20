//import { useState } from "react";
import { HashRouter as Router, Navigate, Route, Routes } from "react-router-dom";
import Auth from "routes/Auth";
import Home from "routes/Home";
import Profile from "routes/Profile";
import Navigation from "components/Navigation";

const AppRouter = ({ isLoggedIn, userObj, refreshUser }) => {
    //const [ isLoggedIn, setIsLoggedIn ] = useState(false);
    return (
        <Router>
            { isLoggedIn && <Navigation userObj={ userObj }/> }
            <Routes>
                { isLoggedIn ? (
                    <>
                        <Route path = "/" element={<Home userObj={userObj}/>}>
                        </Route>
                        <Route path = "/profile" element={<Profile refreshUser={refreshUser} userObj={userObj}/>}>
                        </Route>
                    </>
                ) : (
                    <Route path = "/" element={<Auth />}>
                    </Route>
                )}
                <Route path="*" element={<Navigate to="/" replace/>}/>
            </Routes>
        </Router>
    );
};

export default AppRouter;