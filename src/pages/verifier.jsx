import React, { useState, useEffect } from "react";
import SideMenu from "../components/NavigationMenu";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css"; // Import the CSS file


export const Verifer = () => {
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
                <h1>Verifier Page</h1>
                <SideMenu />
                <Popup
                    trigger={<button>Create New Student</button>}
                    modal
                    closeOnDocumentClick
                >
                    <div className="pop-up">
                        <h2>New Student</h2>
                        <form onSubmit={handleSubmit}>
                            <div>
                                {/* Should auto set to whatever department the verifier is from. */}
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
                            <button type="submit">Create Student</button>
                        </form>
                        <button>Close</button>
                    </div>
                </Popup>
            </div>
        </div>
    );
};