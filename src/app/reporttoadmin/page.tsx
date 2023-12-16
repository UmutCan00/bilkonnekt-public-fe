"use client";
import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from '../components/Navbar';

export default function ReportToAdmin() {
    const [value, setValue] = useState('');
    const [isSent, setIsSent] = useState(false);

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log("message:", value)
        setIsSent(true);
    };

    return (
        <div>
            <Navbar />
            <div className="container">
                <h1 className="text-center mt-4">Message to the Administrator</h1>
                <p className="text-center">Feel free to write your message below. Upon hitting the "Send" button, your message will be dispatched to the admin.</p>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <textarea
                            className="form-control"
                            value={value}
                            onChange={(e) => setValue(e.target.value)}
                            required
                        />
                    </div>
                    <div className="text-right">
                        <button type="submit" className="btn btn-primary">Send</button>
                    </div>
                </form>
                {isSent && <p className="alert alert-success mt-3">Your message has been successfully dispatched!</p>}
            </div>
        </div>
    );
}