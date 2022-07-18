//import { useState } from "react";
import { HashRouter as Router, Navigate, Route, Routes } from "react-router-dom";
import Auth from "routes/Auth";
import Home from "routes/Home";
import Profile from "routes/Profile";
import Navigation from "components/Navigation";

const AppRouter = ({ isLoggedIn }) => {
    //const [ isLoggedIn, setIsLoggedIn ] = useState(false);
    return (
        <Router>
            { isLoggedIn && <Navigation /> }
            <Routes>
                { isLoggedIn ? (
                    <>
                        <Route path = "/" element={<Home />}>
                        </Route>
                        <Route path = "/profile" element={<Profile />}>
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