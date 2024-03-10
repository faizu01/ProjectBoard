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

  const list = localStorage.getItem(statusList);
  console.log(list);

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

  return (
    <div className="body flex justify-center item-center m-4 p-4">
      {statusList.map((status) => (
        <List key={status.status} status={status.status} color={status.color} />
      ))}

      <div className="m-4 p-4">
        {!showInput ? (
          <button
            className="my-2 text-lg bg-black text-white"
            onClick={() => setShowInput(true)}
          >
            + Add New
          </button>
        ) : (
          <>
            <input
              className="bg-black my-2 p-2 text-white w-full h-fit"
              type="text"
              value={newStatus}
              onChange={(e) => setNewStatus(e.target.value)}
              placeholder="Enter a new status"
            />
            <div className="flex gap-3">
              <button
                className="bg-emerald-700 rounded-md p-2"
                onClick={addStatus}
              >
                Create
              </button>
              <button
                className="bg-red-500 rounded-md p-2"
                onClick={() => setShowInput(false)}
              >
                Cancel
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Body;
