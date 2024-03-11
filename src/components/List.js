import React, { useEffect, useState } from "react";
import New from "./New";
import { Link } from "react-router-dom";
import { useDrag, useDrop } from "react-dnd";

const getLocalStorageItems = (listKey) => {
  const list = localStorage.getItem(listKey);
  return list ? JSON.parse(list) : [];
};

const List = ({ status, color }) => {
  const listKey = status;
  const [cards, setCards] = useState(getLocalStorageItems(listKey) || []);

  const [fromStatus, setFromStatus] = useState("");
  const [toStatus, setToStatus] = useState("");

  const addCard = (title) => {
    const description = "";
    const newCard = { id: Date.now(), title, status, description };
    setCards([...cards, newCard]);
  };

  useEffect(() => {
    localStorage.setItem(listKey, JSON.stringify(cards));
  }, [cards, listKey]);

  useEffect(() => {
    // Update cards when status changes
    setCards(getLocalStorageItems(listKey));
  }, [listKey]);

  const [, drop] = useDrop(() => ({
    accept: "CARD",
    drop: (item) => {
      setFromStatus(item.status);
      setToStatus(listKey);
      addItemToStatus(item.id, item.status, listKey);
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  const addItemToStatus = (id, fromStatus, toStatus) => {
    const initialList = JSON.parse(localStorage.getItem(fromStatus));
    const updatedInitialList = initialList.filter((card) => card.id !== id);
    localStorage.setItem(fromStatus, JSON.stringify(updatedInitialList));

    const listToUpdate = JSON.parse(localStorage.getItem(toStatus));
    const updatedListToUpdate = [
      ...listToUpdate,
      initialList.find((card) => card.id === id),
    ];
    localStorage.setItem(toStatus, JSON.stringify(updatedListToUpdate));

    setCards(updatedListToUpdate);
    window.location.reload();
  };

  return (
    <div
      ref={drop}
      className={`list m-4 p-4 bg-white text-black w-1/5 h-fit border border-blue-50`}
    >
      <div className="flex justify-between ">
        <div className="flex">
          <h2 className={`${color} text-black px-2`}>{status + " "}</h2>
          <h2 className="px-3">{cards ? cards.length : "0"}</h2>
        </div>
        <div>
          <button className="px-2 font-bold">...</button>
          <button className="font-bold">+</button>
        </div>
      </div>

      <div className={`cards`}>
        {cards.map((card) => card && <Card key={card.id} card={card} />)}
      </div>

      <New addCard={addCard} />
    </div>
  );
};

const Card = ({ card }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "CARD",
    item: { id: card.id, status: card.status },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <div ref={drag}>
      <Link to={`/card/${card.id}?title=${card.title}&status=${card.status}`}>
        <div
          className={`card  my-2 p-2 text-black border border-slate-400 ${
            isDragging ? "opacity-25" : "opacity-100"
          }`}
        >
          {card.title}
        </div>
      </Link>
    </div>
  );
};

export default List;
