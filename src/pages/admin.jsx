import React, { useState, useContext } from "react";
import SideMenu from "../components/NavigationMenu";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css"; // Import the CSS file
import { AuthContext } from "../context/AuthContext";

export const Admin = () => {
    const [department, setDepartment] = useState("");
    const [number, setNumber] = useState("");

    // Function to handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        // Process form data here
        console.log("Department:", department);
        console.log("Number:", number);
        // Close the pop-up after processing
        // You can add your logic to submit data or perform other actions here
    };

    return (
        <div className="main" id="outer-container">
            <div id="page-wrap">
                <h1>Admin Page</h1>
                <Popup
                    trigger={<button>Create New Verifier</button>}
                    modal
                    closeOnDocumentClick
                >
                    <div className="pop-up">
                        <h2>New Verifier</h2>
                        <form onSubmit={handleSubmit}>
                            <div>
                                <label htmlFor="department">Department: </label>
                                <select
                                    id="department"
                                    value={department}
                                    onChange={(e) => setDepartment(e.target.value)}
                                >
                                    <option value="">Select Department</option>
                                    <option value="Computer Science">Computer Science</option>
                                    <option value="Engineering">Engineering</option>
                                    <option value="Informatics">Informatics</option>
                                </select>
                            </div>
                            <div>
                                <label htmlFor="number">Number: </label>
                                <input
                                    type="number"
                                    id="number"
                                    value={number}
                                    onChange={(e) => setNumber(e.target.value)}
                                />
                            </div>
                            <button type="submit">Create Verifier</button>
                        </form>
                        <button>Close</button>
                    </div>
                </Popup>
            </div>
        </div>
    );
};
