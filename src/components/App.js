import { useEffect, useState } from "react";
import AppRouter from "components/Router";
import { authService } from "fbase";


function App() {
  const [ init, setInit ] = useState(false);
  const [ isLoggedIn, setIsLoggedIn ] = useState(false);
  useEffect( () => {
    authService.onAuthStateChanged( (user) => {
      if(user) {
        setIsLoggedIn(user);
      } else {
        setIsLoggedIn(false);
      }
      setInit(true);
    });
  }, []);
  //setInterval(() => console.log(authService.currentUser), 2000);
  //console.log(authService.currentUser);
  return (
    <>
      { init ? <AppRouter isLoggedIn={isLoggedIn}/> : "Initializing..." }
      <footer>&copy; {new Date().getFullYear()} fatdogwitter</footer>
    </>
  );
}

export default App;
