import { render, screen, fireEvent } from "@testing-library/react";
import EmojiScale from "./EmojiScale";
import '@testing-library/jest-dom/extend-expect';

describe("EmojiScale Component", () => {
  test("renders the modal with the title and emojis", () => {
    render(<EmojiScale />);

    // Check if the modal header is rendered
    expect(screen.getByText("Wellbeing Check-in")).toBeInTheDocument();

    // Check if the emojis are rendered
    expect(screen.getByText("Terrible")).toBeInTheDocument();
    expect(screen.getByText("Bad")).toBeInTheDocument();
    expect(screen.getByText("Alright")).toBeInTheDocument();
    expect(screen.getByText("Pretty Good")).toBeInTheDocument();
    expect(screen.getByText("Fantastic")).toBeInTheDocument();
  });

  test("should allow selecting an emoji", () => {
    render(<EmojiScale />);

    // Click on the "Pretty Good" emoji
    const prettyGoodEmoji = screen.getByText("Pretty Good");
    fireEvent.click(prettyGoodEmoji);

    // Check if the emoji is selected (border is applied)
    // eslint-disable-next-line testing-library/no-node-access
    expect(prettyGoodEmoji.closest('div')).toHaveClass('border-success');
  });

  test("should display the selected emoji in the alert", () => {
    window.alert = jest.fn(); // Mock the alert function

    render(<EmojiScale />);

    // Click on the "Fantastic" emoji
    const fantasticEmoji = screen.getByText("Fantastic");
    fireEvent.click(fantasticEmoji);

    // Click the Continue button
    const continueButton = screen.getByRole('button', { name: /continue/i });
    fireEvent.click(continueButton);

    // Check if the alert was called with the correct message
    expect(window.alert).toHaveBeenCalledWith(
      "You selected: 🤩 - Fantastic"
    );
  });

  test("should disable the continue button until an emoji is selected", () => {
    render(<EmojiScale />);

    // Initially, the Continue button should be disabled
    const continueButton = screen.getByRole('button', { name: /continue/i });
    expect(continueButton).toBeDisabled();

    // Select an emoji
    const prettyGoodEmoji = screen.getByText("Pretty Good");
    fireEvent.click(prettyGoodEmoji);

    // After selecting an emoji, the Continue button should be enabled
    expect(continueButton).toBeEnabled();
  });
});
