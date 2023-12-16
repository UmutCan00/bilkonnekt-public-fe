import React from 'react';

const LostAndFoundList = ({ items }) => {
    const listItemStyle = {
        border: '1px solid #ccc',
        padding: '10px',
        borderColor: "black",
        display: "block",
        textAlign: "center",
        background: "white"
    };
    const listItemContent = {
        border: '1px solid #ccc',
        borderColor: "black",
        display: "inline-block",
        width: "33%",

        color: "black"
    };
    return (
        <>
            {items?.length &&
                <div className="list-item" style={listItemStyle}>
                    <div className="listItemContent" style={listItemContent}>
                        <b>Founded In</b>
                    </div>
                    <div className="listItemContent" style={listItemContent}>
                        <b>Description</b>
                    </div>
                    <div className="listItemContent" style={listItemContent}>
                        <b>Delivered To</b>
                    </div>
                </div>
            }
            {items.map((item, index) => (
                <li key={index} className="list-item" style={listItemStyle}>
                    <div className="listItemContent" style={listItemContent}>
                        <p>{item.text1}</p>
                    </div>
                    <div className="listItemContent" style={listItemContent}>
                        <p>{item.text2}</p>
                    </div>
                    <div className="listItemContent" style={listItemContent}>
                        <p>{item.text3}</p>
                    </div>
                </li>
            ))}
        </>
    );
};

export default LostAndFoundList;
