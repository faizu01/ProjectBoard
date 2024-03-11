import React, { useState } from "react";

const New = ({ addCard }) => {
  const [title, setTitle] = useState("");
  const [showInput, setShowInput] = useState(false);

  const handleAddCard = () => {
    if (title.trim() !== "") {
      addCard(title);
      setTitle("");
      setShowInput(false);
    }
  };

  const handleCrossCard = () => {
    setTitle("");
    setShowInput(false);
  };

  return (
    <div>
      {!showInput ? (
        <button className="my-2 text-lg" onClick={() => setShowInput(true)}>
          + New
        </button>
      ) : (
        <>
          <input
            className="bg-white my-2 p-2 text-black w-full h-fit "
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter a title for this card"
          />
          <div className="flex gap-3">
            <button
              onClick={handleAddCard}
              className="bg-emerald-700 rounded-md px-3 text-white"
            >
              Add
            </button>
            <button
              onClick={handleCrossCard}
              className="bg-red-400 rounded-md p-2 text-white"
            >
              Cancel
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default New;
