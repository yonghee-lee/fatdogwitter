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
        <div>
        
        
        <div className="container">
            <form onSubmit={onSubmit} className="profileForm">
                <input 
                    type="text" 
                    onChange={onChange} 
                    placeholder="Display name" 
                    value={newDisplayName} 
                    autoFocus
                    className="formInput"
                />
                <input 
                    type="submit" 
                    value="Update Profile" 
                    className="formBtn"
                    style={{
                        marginTop: 10,
                    }}
                /> 
            </form>
            <span className="formBtn cancelBtn logOut" onClick={onLogoutClick}>
                Log Out
            </span>
            
        </div>
        <div className="container" style={{ marginTop: 30 }}>
            { dweets.map((dweet) => (
                <Dweet key={dweet.id} dweetObj={dweet} isOwner={dweet.creatorId === userObj.uid} />
            ))}
        </div>
        
        </div>
    );
};
export default Profile;