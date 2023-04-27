import React, { useState, useEffect } from "react";
import axios from "axios";
import "./TriviaGame.css";

type Question = {
  readonly category: string;
  readonly type: string;
  readonly difficulty: string;
  readonly question: string;
  readonly correctAnswer: string;
  readonly incorrectAnswers: readonly string[];
};

// fetches and displays a trivia question.
const TriviaGame: React.FC = () => {
  const [question, setQuestion] = useState<Question | null>(null); // The current trivia question
  const [userAnswer, setUserAnswer] = useState(""); // The user's answer to the question
  const [isCorrect, setIsCorrect] = useState(false); // Whether the user's answer is correct
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false); // Whether the user has submitted an answer
  const [errorMessage, setErrorMessage] = useState(""); // An error message to display if something goes wrong

  // This function fetches a trivia question from the Open Trivia database API.
  const fetchQuestion = async (): Promise<Question> => {
    const { data } = await axios.get("https://opentdb.com/api.php?amount=1");
    const {
      category,
      type,
      difficulty,
      question,
      correct_answer,
      incorrect_answers,
    } = data.results[0];
    return {
      category,
      type,
      difficulty,
      question,
      correctAnswer: correct_answer,
      incorrectAnswers: incorrect_answers as readonly string[],
    };
  };

  // This useEffect hook runs once, when the component is first mounted
  useEffect(() => {
    const fetchQuestionAndResetState = async () => {
      try {
        const newQuestion = await fetchQuestion();
        setQuestion(newQuestion);
        setUserAnswer("");
        setIsCorrect(false);
        setIsAnswerSubmitted(false);
        setErrorMessage("");
      } catch (error: any) {
        setErrorMessage(error.message);
      }
    };
    fetchQuestionAndResetState();
  }, []);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsAnswerSubmitted(true);
    setIsCorrect(userAnswer === question!.correctAnswer);
    setTimeout(async () => {
      try {
        const newQuestion = await fetchQuestion();
        setQuestion(newQuestion);
        setUserAnswer("");
        setIsCorrect(false);
        setIsAnswerSubmitted(false);
        setErrorMessage("");
      } catch (error: any) {
        setErrorMessage(error.message);
      }
    }, 1000);
  };

  return (
    <div className="container">
      {errorMessage && (
        <div className="trivia-message">{`An error occurred: ${errorMessage}`}</div>
      )}
      {question ? (
        <>
          <div className="trivia-category">{question.category}</div>
          <div className="trivia-difficulty">{question.difficulty}</div>
          <div className="trivia-question">{question.question}</div>
          <form onSubmit={handleSubmit}>
            <label>
              Your answer:
              <input
                className="trivia-input"
                type="text"
                value={userAnswer}
                onChange={(event) => setUserAnswer(event.target.value)}
                required
              />
            </label>
            <button className="trivia-button" type="submit">
              Submit
            </button>
            {errorMessage && (
              <div id="answer-error" className="trivia-error">
                {errorMessage}
              </div>
            )}
          </form>
          {isAnswerSubmitted && (
            <div
              className={`trivia-answer ${
                isCorrect ? "trivia-correct" : "trivia-incorrect"
              }`}
            >
              {isCorrect
                ? "Correct!"
                : `Incorrect! The correct answer was: ${question.correctAnswer}`}
            </div>
          )}
        </>
      ) : (
        <div className="trivia-message">Loading...</div>
      )}
    </div>
  );
};

export default TriviaGame;
