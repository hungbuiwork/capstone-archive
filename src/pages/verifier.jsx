import React, { useState, useEffect } from "react";
import SideMenu from "../components/NavigationMenu";
import { firestore, auth, storage } from "../firebase";

import { createUserWithEmailAndPassword } from "firebase/auth";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css"; // Import the CSS file

// TODO MAKE THE POPUP INTO A COMPONENT FOR IMPORT 

// WHAT TO ADD
// on creation of a verifier should add a new collection of students under them 
// user
// user/verifier 
// user/verifier/student/etc 


// 1. Ability to see Accounts available to them (accountComponent); 
//  - database for students should have: 
//      - accountName, password; projectStatus; department; ProjectID; canEdit; role; verifierID; ID; 
//  - database for verifier: 
//      - accountName, password; department; role; ID; listStudents; 
// 2. Add accounts
// 3. Delete accounts
// 4. View projects 
// 5. Accept projects
// 6. Add projects with comments
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