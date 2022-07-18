import { useState } from "react";

const Home = () => {
    //<span>Home</span>;
    const [ dweet, setDweet ] = useState("");

    const onSubmit = (event) => {
        event.preventDefault();
    };

    const onChange = (event) => {
        event.preventDefault();
        const {
            target: { value }
        } = event;
        setDweet(value);
    };

    return (
        <form onSubmit={onSubmit}>
            <input
                value={dweet}
                onChange={onChange}
                type="text"
                placeholder="What's on your mind?"
                maxLength={120}
            />
            <input type="submit" value="Dweet" />
        </form>
    );
};
export default Home;