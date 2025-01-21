import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

import { FaArrowLeft } from "react-icons/fa";
import { IoClose } from "react-icons/io5";

import "./EmojiScale.css";

const EmojiScale = () => {
  const [selectedEmoji, setSelectedEmoji] = useState(null);

  const emojis = [
    { id: 1, emoji: "😞", text: "Terrible" },
    { id: 2, emoji: "😔", text: "Bad" },
    { id: 3, emoji: "😐", text: "Alright" },
    { id: 4, emoji: "🙂", text: "Pretty Good" },
    { id: 5, emoji: "🤩", text: "Fantastic" },
  ];

  const handleEmojiClick = (emoji) => {
    setSelectedEmoji(emoji);
  };

  return (
    <>
      <Modal show={true} centered size="lg">
        <div className="pt-3 px-3 d-flex justify-content-between align-items-center">
          <div className="cursor-pointer">
            <FaArrowLeft />
          </div>
          <div className="cursor-pointer">
            <IoClose />
          </div>
        </div>
        <Modal.Header className="pt-0">
          <Modal.Title className="text-center w-100 fs-5">
            Wellbeing Check-in
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p className="text-center fs-5 fw-bold">
            Hello! How are you feeling today?
          </p>
          <div className="w-100">
            <div className="d-flex flex-column flex-sm-row justify-content-center align-items-center gap-2">
              {emojis.map((emoji, index) => (
                <div className="emoji-option h-50" key={index}>
                  <div
                    onClick={() => handleEmojiClick(emoji)}
                    className={`${
                      selectedEmoji?.emoji === emoji.emoji
                        ? "border border-success"
                        : ""
                    } border p-3 rounded-4 d-flex flex-column justify-content-center align-items-center gap-2 cursor-pointer`}
                  >
                    <div className="fs-1">{emoji.emoji}</div>
                    <p style={{ fontSize: "12px" }} className="text-nowrap p-0">
                      {emoji.text}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            disabled={!selectedEmoji}
            onClick={() => {
              alert(
                `You selected: ${selectedEmoji?.emoji} - ${selectedEmoji?.text}`
              );
              setSelectedEmoji(null);
            }}
            className="w-100"
            variant="primary"
          >
            Continue
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default EmojiScale;
