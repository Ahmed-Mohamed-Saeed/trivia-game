import { render, screen } from "@testing-library/react";
import TriviaGame from "./TriviaGame";
import axios from "axios";
import "@testing-library/jest-dom/extend-expect";

// Mock the axios.get function to return a single mock question
jest.mock("axios");
const mockQuestion = {
  category: "Science: Computers",
  type: "multiple",
  difficulty: "hard",
  question:
    "What is the name given to layer 4 of the Open Systems Interconnection (ISO) model?",
  correctAnswer: "Transport",
  incorrectAnswers: ["Session", "Data link", "Network"],
};
(axios.get as jest.MockedFunction<typeof axios.get>).mockResolvedValue({
  data: { results: [mockQuestion] },
});

describe("TriviaGame", () => {
  // Test that the TriviaGame component renders a question when it is loaded
  it("should render a question when loaded", async () => {
    render(<TriviaGame />);
    const question = await screen.findByText(mockQuestion.question);
    expect(question).toBeInTheDocument();
  });

  // Test that an error message is displayed when the request fails
  it("should display an error message when the request fails", async () => {
    const errorMessage = "An error occurred";
    (axios.get as jest.MockedFunction<typeof axios.get>).mockRejectedValue(
      new Error(errorMessage)
    );
    render(<TriviaGame />);
    const error = await screen.findByText(`An error occurred: ${errorMessage}`);
    expect(error).toBeInTheDocument();
  });
});
