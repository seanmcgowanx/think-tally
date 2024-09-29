import React from "react";

export default function Home({ startGame, urlInfo, handleUrlInfoChange }) {
    
    /// Use React.useEffect to scroll to top of page on component mount and unmount
    React.useEffect(() => {
        const onBeforeUnload = () => {
            window.scrollTo(0, 0);
        };
        window.addEventListener("beforeunload", onBeforeUnload);
        return () => {
            window.removeEventListener("beforeunload", onBeforeUnload);
        };
    }, []);

    // Use React.useEffect to scroll to top of page on scroll
    React.useEffect(() => {
        const handleScroll = () => {
            window.scrollTo(0, 0);
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    // Return JSX for Rendering
    return (
        <div className="home-screen">
            {/* Render the title */}
            <h1 className="home-title">Think Tally</h1>
            {/* Render the description */}
            <p className="home-description">
                This is a game of random trivia! <br /> Select the number, difficulty and type of questions below.
            </p>
            <div className="select-container">
                {/* Render the input for selecting the number of questions */}
                <div className="option-container">
                    <label className="select-label" htmlFor="num">Select Number</label>
                    <input 
                        id="num" 
                        name="number" 
                        className="input-style" 
                        type="number" 
                        value={urlInfo.number} 
                        min="1" 
                        max="50" 
                        onChange={handleUrlInfoChange}
                    />
                </div>
                {/* Render the select for selecting the difficulty */}
                <div className="option-container">
                    <label className="select-label" htmlFor="diff">Select Difficulty</label>
                    <select 
                        id="diff" 
                        name="difficulty" 
                        className="select-style" 
                        onChange={handleUrlInfoChange}
                    >
                        <option>Any Difficulty</option>
                        <option>Easy</option>
                        <option>Medium</option>
                        <option>Hard</option>
                    </select>
                </div>
                {/* Render the select for selecting the type of questions */}
                <div className="option-container">
                    <label className="select-label" htmlFor="type">Select Type</label>
                    <select 
                        id="type" 
                        name="type" 
                        className="select-style" 
                        onChange={handleUrlInfoChange}
                    >
                        <option>Any Type</option>
                        <option>Multiple Choice</option>
                        <option>True / False</option>
                    </select>
                </div>
            </div>
            {/* Render the button to start the game */}
            <button onClick={startGame} className="start-btn">
                Start Game
            </button>
        </div>
    );
}