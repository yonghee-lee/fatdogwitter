import { dbService, storageService } from "fbase";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPencilAlt, faPen } from "@fortawesome/free-solid-svg-icons";


const Dweet = ({dweetObj, isOwner}) => {
    const [ editing, setEditing ] = useState(false);
    const [ newDweet, setNewDweet ] = useState(dweetObj.text);

    const onDeleteClick = async () => {
        const ok = window.confirm("삭제하시겠습니까?");
        
        if(ok) {
            
            await dbService.doc(`dweets/${dweetObj.id}`).delete();
            if(dweetObj.attachmentUrl !== "")
                await storageService.refFromURL(dweetObj.attachmentUrl).delete();
        }
    }

    const toggleEditing = () => setEditing((prev) => !prev);

    const onChange = (event) => {
        const {
            target: { value },

        } = event;
        setNewDweet(value);
    }

    const onSubmit = async (event) => {
        event.preventDefault();
        await dbService.doc(`dweets/${dweetObj.id}`).update({text: newDweet});
        setEditing(false);
    }

    return (
        <div className="nweet">
            {editing ? (
                <>
                <form onSubmit={onSubmit} className="container nweetEdit">
                    <input 
                        value={newDweet} 
                        onChange={onChange} 
                        required 
                        placeholder="Edit your dweet"
                        autoFocus
                        className="formInput"
                    />
                    <input type="submit" value="Update Dweet" className="formBtn"/>
                </form>
                <button onClick={toggleEditing} className="formBtn cancelBtn">Cancel</button>
                </>
            ) : (
            <>
            <h4>{dweetObj.text}</h4>
            {dweetObj.attachmentUrl && ( <img src={dweetObj.attachmentUrl} width="50px" height="50px"/>)}
            {isOwner && (
                <div className="nweet__actions">
                    <span onClick={onDeleteClick}>
                        <FontAwesomeIcon icon={faTrash}/>
                    </span>
                    <span onClick={toggleEditing}>
                        <FontAwesomeIcon icon={faPencilAlt}/>
                    </span>
                </div>
            )}
            </>
            )}
        </div>
    );
};

export default Dweet;