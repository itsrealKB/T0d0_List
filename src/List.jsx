import React from "react";

export default function List({ removeItem, value }) {
  return (
    <div className="list">
      <ol>
        <button className="remove--task" onClick={removeItem}>
          +
        </button>
        <li>{value}</li>
      </ol>
    </div>
  );
}
