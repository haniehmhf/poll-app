import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import VoteContext from "../../context/VoteContext";
import VotePage from "./VotePage";

const renderComponent = () =>
  render(
    <VoteContext>
      <VotePage />
    </VoteContext>
  );

// mock VoteResult component
jest.mock("../VoteResult", () => () => <div>VoteResult</div>);

describe("Render", () => {
  test("renders vote page", () => {
    renderComponent();
    expect(screen.getByText("Create Vote")).toBeInTheDocument();
    expect(screen.getByText("0/10 possible answers")).toBeInTheDocument();
    expect(screen.getByText("No poll has been created.")).toBeInTheDocument();
    expect(screen.getByTestId("question-title")).toBeInTheDocument();
    expect(screen.getByTestId("add-option-form")).toBeInTheDocument();
  });
});

describe("Intractions", () => {
  test("Check if vote flow is working", () => {
    renderComponent();

    // add question title
    const qTitleInput = screen.getByTestId("question-title");
    fireEvent.change(qTitleInput, {
      target: { value: "What is your favorite color?" },
    });

    expect(screen.getByTestId("question")).toHaveTextContent(
      "Q: What is your favorite color?"
    );

    // add first option
    const addOptionForm = screen.getByTestId("add-option-form");
    const addOptionInput = screen.getByTestId("add-option-input");
    fireEvent.change(addOptionInput, {
      target: { value: "Red" },
    });
    fireEvent.submit(addOptionForm);

    // expect can not vote error to be visible
    expect(
      screen.getByText("You can't vote yet, at least 2 options are needed!")
    ).toBeInTheDocument();

    // add second option
    fireEvent.change(addOptionInput, {
      target: { value: "Blue" },
    });
    fireEvent.submit(addOptionForm);

    expect(screen.getByText("2/10 possible answers")).toBeInTheDocument();

    // select first option using role radio
    const firstOption = screen.getByRole("radio", { name: "Red" });
    fireEvent.click(firstOption);

    expect(screen.getByTestId("submit-vote")).toBeEnabled();
  });
});
