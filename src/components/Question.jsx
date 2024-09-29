import React from 'react';

export default function QuestionElement({ 
    question, 
    choices, 
    id, 
    handleAnswerChange, 
    selectedChoices, 
    correctChoices, 
    quizSubmitted, 
    style 
}) {
   
    // Return JSX for Rendering
    return (
        <div className="question-element" style={style}>
            <h2 className="question">{question}</h2>
            <div className="choices">
                {/* Map over the choices array to render each choice */}
                {choices[id].map((choice, index) => {
                    const isCurrentChoiceSelected = selectedChoices[id] === choice;
                    const isCurrentChoiceCorrect = correctChoices[id] === choice;
                    const isCurrentChoiceIncorrect = quizSubmitted && !isCurrentChoiceCorrect;

                    // Define conditional styles
                    let backgroundColor = '';
                    let border = ''; 
                    let opacity = '';

                    // Apply styles based on selection and correctness
                    if (quizSubmitted && (isCurrentChoiceSelected || isCurrentChoiceCorrect)) {
                        backgroundColor = isCurrentChoiceCorrect ? '#94D7A2' : '#F8BCBC';
                        border = 'none'
                    } else if (isCurrentChoiceSelected) {
                        backgroundColor = '#D6DBF5';
                    }

                    if (isCurrentChoiceIncorrect) {
                        opacity = '50%'
                    }
                    
                    // Return JSX for rendering the choice
                    return (
                        <React.Fragment key={index}>
                            {/* Render a hidden radio input for each choice */}
                            <input 
                                id={`c${index + 1}-${id}`} 
                                type="radio" 
                                name={id} 
                                value={choice} 
                                onChange={handleAnswerChange} 
                                checked={isCurrentChoiceSelected}
                            />
                            {/* Render the selectable choice label */}
                            <label 
                                className="radio-label" 
                                style={{ backgroundColor, opacity, border }} 
                                htmlFor={`c${index + 1}-${id}`}>{choice}
                            </label>
                        </React.Fragment>
                    );
                })}
            </div>
            {/* Render Horizontal Rule */}
            <hr />
        </div>
    );
}