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
            className="bg-white my-2 p-2 text-black w-full h-fit"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter a title for this card"
          />
          <div className="flex gap-3">
            <button onClick={handleAddCard}>Add</button>
            <button onClick={handleCrossCard}>❌</button>
          </div>
        </>
      )}
    </div>
  );
};

export default New;
