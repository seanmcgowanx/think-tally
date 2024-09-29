import React from 'react';
import Home from './components/Home';
import Question from './components/Question'
import { decode } from 'html-entities';

export default function App() {
    
    // Define state variables
    const [quizData, setQuizData] = React.useState({});
    const [urlInfo, setUrlInfo] = React.useState({
        number: "10",
        difficulty: "",
        type: ""
    })
    const [questions, setQuestions] = React.useState([]);
    const [choices, setChoices] = React.useState([]);
    const [correctChoices, setCorrectChoices] = React.useState([]);
    const [selectedChoices, setSelectedChoices] = React.useState([""]);
    const [play, setPlay] = React.useState(false);
    const [quizSubmitted, setQuizSubmitted] = React.useState(false);
    const [score, setScore] = React.useState(""); 
    
    // Define effect to scroll to top of the page when 'play' state changes
    React.useEffect(() => {
            window.scrollTo(0, 0); 
    }, [play]);

    // Define effect to fetch quiz data from API when 'play' state changes
    React.useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(generateUrl(urlInfo));
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setQuizData(data);
                generateQuestions(data);
                generateChoices(data);
            } catch (error) {
                console.error('Error fetching quiz data:', error);
            }
        };

        fetchData();
    }, [play]);

    // Function to generate URL based on user-selected options
    function generateUrl(urlInfo) {
        const num = urlInfo.number 
        const diff = urlInfo.difficulty === "Any Difficulty" ? "" : urlInfo.difficulty
        const type = urlInfo.type === "Any Type" ? "" : urlInfo.type === "Multiple Choice" ? "multiple" : urlInfo.type === "True / False" ? "boolean" : ""
        const url = 'https://opentdb.com/api.php?amount=' + num + (diff ? '&difficulty=' + diff.toLowerCase() : '') + (type ? '&type=' + type : '')
        return url
    }

    // Function to generate questions from quiz data
    function generateQuestions(data) {
        if (data && data.results) {
            const questionsArray = data.results.map(item => {
                return decode(item.question);
            })
        setQuestions(questionsArray)
        }
    }

    function generateChoices(data) {
        if (data && data.results) {
            const choicesArray = data.results.map(item => {
                // Check if the question type is multiple choice
                if (item.type === 'multiple') {
                    // For multiple-choice questions, shuffle all choices
                    const allChoices = [...item.incorrect_answers, item.correct_answer].map(choice => decode(choice));
                    return shuffleArray([...allChoices]);
                } else {
                    // For true/false questions, preserve the order of choices
                    return ['True', 'False'];
                }
            });
            setChoices(choicesArray);
            // Correctly identify and set the correct choices after shuffling
            setCorrectChoices(data.results.map((item, index) => decode(item.correct_answer)));
        }
    }
    
    // Helper Function to shuffle an array using Fisher-Yates algorithm
    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    // Function to score the quiz
    function scoreQuiz(questions) {
        const isAnswerCorrect = selectedChoices.map((choice, index) => {
            return choice === correctChoices[index];
        });
        const correctAnswers = isAnswerCorrect.filter(answer => answer).length;
        const score = `${correctAnswers} / ${questions.length} `;
        return score;
    }

    // Function to handle form submission
    function handleSubmit(event) {
        event.preventDefault();
        const score = scoreQuiz(questions);
        setQuizSubmitted(true);
        setScore(score); 
    }

    // Function to handle user selection of answers
    function handleAnswerChange(event) {
        const { name, value } = event.target;
        setSelectedChoices(prevSelectedChoices => {
            const selectedChoiceArray = [...prevSelectedChoices];
            selectedChoiceArray[name] = value;
            return selectedChoiceArray;
        });
    }

    // Function to handle user selection of question options
    function handleUrlInfoChange(event) {
        const { name, value } = event.target;
        setUrlInfo(prevUrlInfo => ({
            ...prevUrlInfo,
            [name]: value
        }))
    }

    // Function to handle play again button click
    function handlePlayAgain() {
        setQuizSubmitted(false);
        setSelectedChoices([""]);
        setScore(""); 
        window.scrollTo(0, 0);
    }

    // Function to handle return home button click
    function handleReturnHome() {
        setQuizSubmitted(false);
        setSelectedChoices([""]);
        setPlay(false);
        setScore(""); 
        window.scrollTo(0, 0);
        setUrlInfo({
            number: "10",
            difficulty: "",
            type: ""
        })
    }
    
    // Generate quiz components based on questions
    const quizComponents = questions.map((question, index) => {
        return (
            <div className="quiz-container">
                <Question
                    key={index} 
                    question={question}
                    choices={choices} 
                    id={index}
                    handleAnswerChange={handleAnswerChange}
                    selectedChoices={selectedChoices}
                    correctChoices={correctChoices}
                    quizSubmitted={quizSubmitted}
                    style={{ marginTop: index === 0 ? '75px' : '0' }}
                />
            </div>
        )
    })
    
    // Return JSX for rendering
    return (
        <main>
            {!play && <Home 
                        startGame={() => setPlay(true)} 
                        play={play} 
                        handleUrlInfoChange={handleUrlInfoChange}
                        urlInfo={urlInfo}
                       />}
            <form onSubmit={handleSubmit}>
                {play && quizComponents}
                {play && !quizSubmitted && <button type="submit" className="check-btn">Check Answers</button>}
                <div className="check-answers-container">
                    {quizSubmitted && <h3 className="score-prompt">You scored {score} correct answers!</h3>}
                    {play && quizSubmitted && <button className="control-btn" onClick={handlePlayAgain}>Play Again</button>}
                    {play && <button className="control-btn" onClick={handleReturnHome}>Return Home</button>}
                </div>
            </form>
        </main>
    )
}