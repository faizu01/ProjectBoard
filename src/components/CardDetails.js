import React, { useEffect, useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";

const getLocalStorageCardDetail = (initialStatus, cardID) => {
  const list = JSON.parse(localStorage.getItem(initialStatus));
  const index = list.findIndex((card) => card.id === Number(cardID));
  return list[index].description;
};

const CardDetails = () => {
  // Access query parameters
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const initialTitle = searchParams.get("title");
  const initialStatus = searchParams.get("status");
  const { cardID } = useParams();
  const initialDescription = getLocalStorageCardDetail(initialStatus, cardID);
  // Local state variables
  const [newTitle, setNewTitle] = useState(initialTitle);
  const [newStatus, setNewStatus] = useState(initialStatus);
  const [newDescription, setNewDescription] = useState(initialDescription);
  const [Delete, setDelete] = useState(false); // State to track delete action
  //

  //Store statusList
  const statusList = JSON.parse(localStorage.getItem("statusList"));

  //
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const currentStatusList =
      JSON.parse(localStorage.getItem(initialStatus)) || [];
    const updatedCurrentStatusList = currentStatusList.filter(
      (card) => card.id !== Number(cardID)
    );

    if (Delete) {
      const userConfirmed = window.confirm(
        "Are you sure you want to delete this card ?"
      );
      if (userConfirmed) {
        localStorage.setItem(
          initialStatus,
          JSON.stringify(updatedCurrentStatusList)
        );
      }
    } else {
      const updatedCard = {
        id: Number(cardID),
        title: newTitle,
        status: newStatus,
        description: newDescription,
      };

      localStorage.setItem(
        initialStatus,
        JSON.stringify(updatedCurrentStatusList)
      );

      const newStatusList = JSON.parse(localStorage.getItem(newStatus)) || [];
      const updatedNewStatusList = [...newStatusList, updatedCard];
      localStorage.setItem(newStatus, JSON.stringify(updatedNewStatusList));
    }

    navigate("/");
  };

  return (
    <div className="m-4 p-4 flex flex-col justify-center items-center w-screen">
      <h1 className="text-3xl font-bold mb-4">Update Details</h1>
      <div className="bg-white p-6 rounded-lg shadow-md w-96">
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="title" className="block font-medium text-gray-700">
              Title
            </label>
            <input
              type="text"
              id="title"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="status" className="block font-medium text-gray-700">
              Status
            </label>
            <select
              id="status"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              value={newStatus}
              onChange={(e) => setNewStatus(e.target.value)}
            >
              {statusList.map((statusItem) => (
                <option key={statusItem.status} value={statusItem.status}>
                  {statusItem.status}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="desc" className="block font-medium text-gray-700">
              Description
            </label>
            <textarea
              id="desc"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              rows="4"
              value={newDescription}
              onChange={(e) => setNewDescription(e.target.value)}
            ></textarea>
          </div>
          <div>
            <button
              type="submit"
              className="w-full bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600 focus:outline-none focus:bg-indigo-600"
            >
              Update Details
            </button>
          </div>
          <div>
            <button
              type="submit"
              className="w-full bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600 focus:outline-none focus:bg-indigo-600"
              onClick={() => setDelete(true)}
            >
              Delete this Card
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CardDetails;
