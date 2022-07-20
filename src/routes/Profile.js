import { authService, dbService  } from "fbase";
import { useEffect, useState } from "react";
import Dweet from "components/Dweet";

const Profile = ({userObj, refreshUser}) => { 
    const onLogoutClick = () => authService.signOut();
    const [ dweets, setDweets ] = useState([]);
    const [ newDisplayName, setNewDisplayName ] = useState(userObj.displayName);

    const onChange = (event) => {
        const {
            target: { value },
        } = event;
        setNewDisplayName(value);
    }

    const onSubmit = async (event) => {
        event.preventDefault();
        if(userObj.displayName !== newDisplayName) {
            await userObj.updateProfile({ displayName: newDisplayName })
            refreshUser();
        }
        
    }

    useEffect( () => {
        dbService.collection("dweets")
                 .where("creatorId", "==", userObj.uid)
                 .orderBy("createdAt", "asc")
                 .onSnapshot((snapshot) => {
                    const newArray = snapshot.docs.map((document) => ({
                            id: document.id,
                            ...document.data(),
                        })
                    )
                    setDweets(newArray);
                });
        
    }, []);
    //useEffect(() => {
    //    getMyDweets();
    //}, []);
    return (
        <>
        <div>
            { dweets.map((dweet) => (
                <Dweet key={dweet.id} dweetObj={dweet} isOwner={dweet.creatorId === userObj.uid} />
            ))}
        </div>
        <form onSubmit={onSubmit}>
           <input type="text" onChange={onChange} placeholder="Display name" value={newDisplayName} />
           <input type="submit" value="Update Profile" /> 
        </form>
        <button onClick={onLogoutClick}>Log Out</button>
        </>
    );
};
export default Profile;