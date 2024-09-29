# ThinkTally

**ThinkTally** is a trivia game application that fetches random trivia questions from the Open Trivia Database (https://opentdb.com/). The app allows users to select the number of questions, difficulty level, and type of questions (Multiple Choice or True/False). Users can answer the questions and receive a score at the end of the quiz.

## Table of Contents

- [Installation](#installation)
- [Features](#features)
- [Usage](#usage)
- [Components](#components)
- [API Reference](#api-reference)
- [License](#license)

---

## Installation

To install and run the project locally:

1. **Clone the repository:**

   ```bash
   git clone https://github.com/your-username/thinktally.git
   cd thinktally

2. **Install Dependencies**

    npm install

3. **Start the App**

    npm start

## Features

 - Fetches trivia questions from the Open Trivia Database.
 - Choose difficulty level: Easy, Medium, or Hard.
 - Select question type: Multiple Choice or True/False.
 - Specify the number of questions: Options include 1-50
 - Scoring system: Receive a score at the end of the quiz.
 - Review results: Displays correct answers and user’s answers for review.

 ## Usage

Once the app is up and running:

1. Choose the difficulty level from the dropdown (Easy, Medium, or Hard).
2. Select the number of questions from the dropdown (e.g., 10, 25, 50).
3. Choose the type of questions (Multiple Choice or True/False).
4. Click the "Start Quiz" button to begin.
5. Answer each question by selecting the correct option.
6. After completing the quiz, you will see the results with the score and a review of the correct answers.

## Components

- **App Component**: The root component that manages the state of the game and coordinates the trivia API calls.

- **TriviaForm Component**: Handles the user's input for question type, difficulty, and number of questions. Contains the "Start Quiz" button.

- **Question Component**: Displays each trivia question, with answer options for the user to select.

- **Scoreboard Component**: Shows the score and a breakdown of correct and incorrect answers at the end of the quiz.

## API Reference

- **Trivia API**: Open Trivia Database

- **Endpoint**: [https://opentdb.com/api.php](https://opentdb.com/api.php)

### Query Parameters:

- **amount**: Number of questions (e.g., 10)
- **difficulty**: Difficulty level (easy, medium, hard)
- **type**: Type of question (multiple, boolean)

## License

This project is licensed under the MIT License.

## Try Live Demo

You can try the live demo of the Trivia Quiz app [here](https://thinkk-tallyy.netlify.app).









