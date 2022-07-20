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
            <div 
                        style={{
                            maxWidth: 890,
                            width: "100%",
                            margin: "0 auto",
                            marginTop: 80,
                            display: "flex",
                            justifyContent: "center", 
                        }}
                    >
            
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
            </div>
        </Router>
    );
};

export default AppRouter;