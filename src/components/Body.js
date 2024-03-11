import React, { useState, useEffect } from "react";
import List from "./List";

const Body = () => {
  const [statusList, setStatusList] = useState(() => {
    const savedStatusList = localStorage.getItem("statusList");

    return savedStatusList
      ? JSON.parse(savedStatusList)
      : [
          { status: "not-started", color: "bg-red-300" },
          { status: "Ongoing", color: "bg-red-200" },
          { status: "Progress", color: "bg-emerald-500" },
        ];
  });

  const [newStatus, setNewStatus] = useState("");
  const [showInput, setShowInput] = useState(false);

  useEffect(() => {
    localStorage.setItem("statusList", JSON.stringify(statusList));
  }, [statusList]);

  const addStatus = () => {
    if (
      newStatus.trim() !== "" &&
      !statusList.some(
        (status) => status.status.toLowerCase() === newStatus.toLowerCase()
      )
    ) {
      setStatusList([
        ...statusList,
        { status: newStatus, color: "bg-blue-500" },
      ]);
      setNewStatus("");
      setShowInput(false); // Hide the input field after adding a new status
    }
  };
  const cancelStatus = () => {
    setShowInput(false);
    setNewStatus("");
  };
  return (
    <div className="body flex flex-col items-center m-4 p-4">
      <div className="w-full flex flex-col items-center mb-4">
        {!showInput ? (
          <button
            className="text-lg bg-red-400 text-white rounded-full p-2 my-10 "
            onClick={() => setShowInput(true)}
          >
            + Add New status
          </button>
        ) : (
          <div className="w-full flex flex-col items-center mb-4">
            <input
              className="text-black p-2 rounded-lg w-40 mb-2 border border-black"
              type="text"
              value={newStatus}
              onChange={(e) => setNewStatus(e.target.value)}
              placeholder="Enter a new status"
            />

            <div className="flex gap-3">
              <button
                className="bg-emerald-700 rounded-md p-2 text-white"
                onClick={addStatus}
              >
                Create
              </button>
              <button
                className="bg-red-500 rounded-md p-2 text-white"
                onClick={cancelStatus}
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="w-full flex flex-wrap justify-center gap-4">
        {statusList.map((status) => (
          <List
            key={status.status}
            status={status.status}
            color={status.color}
          />
        ))}
      </div>
    </div>
  );
};

export default Body;
