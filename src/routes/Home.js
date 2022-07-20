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
        <>
            <DweetFactory userObj={userObj}/>
            <div>
                { dweets.map((dweet) => (
                    <Dweet key={dweet.id} dweetObj={dweet} isOwner={dweet.creatorId === userObj.uid} />
                ))}
            </div>
        </>
    );
};
export default Home;