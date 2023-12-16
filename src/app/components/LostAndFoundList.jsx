import React from "react";
import { ListGroup } from "react-bootstrap";

const LostAndFoundList = ({ items }) => {
  const listItemStyle = {
    border: "1px solid #ccc",
    borderColor: "black",
    background: "white",
  };

  const listItemContentStyle = {
    width: "33%",
    overflowWrap: "break-word", // Ensure long words wrap to the next line
  };

  return (
    <ListGroup>
      <ListGroup.Item
        style={listItemStyle}
        className="d-flex justify-content-between fw-bold"
      >
        <span style={listItemContentStyle}>Founded In</span>
        <span style={listItemContentStyle}>Description</span>
        <span style={listItemContentStyle}>Delivered To</span>
      </ListGroup.Item>
      {items.map((item, index) => (
        <ListGroup.Item
          key={index}
          style={listItemStyle}
          className="d-flex justify-content-between"
        >
          <span style={listItemContentStyle}>{item.text1}</span>
          <span style={listItemContentStyle}>{item.text2}</span>
          <span style={listItemContentStyle}>{item.text3}</span>
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
};

export default LostAndFoundList;
