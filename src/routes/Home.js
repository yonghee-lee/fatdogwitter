import { dbService } from "fbase";
import { useEffect, useState } from "react";
import Dweet from "components/Dweet";
import DweetFactory from "components/DweetFactory";

const Home = ({userObj}) => {
    //<span>Home</span>;
    const [ dweets, setDweets ] = useState([]);

    useEffect( () => {
        dbService.collection("dweets").onSnapshot((snapshot) => {
            const newArray = snapshot.docs.map((document) => ({
                id: document.id,
                ...document.data(),
            }));
            setDweets(newArray);
            
        });
    }, []);

    return (
        <div className="container">
            <DweetFactory userObj={userObj}/>
            <div style={{ marginTop: 30 }}>
                { dweets.map((dweet) => (
                    <Dweet key={dweet.id} dweetObj={dweet} isOwner={dweet.creatorId === userObj.uid} />
                ))}
            </div>
        </div>
    );
};
export default Home;