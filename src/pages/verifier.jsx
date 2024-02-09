import React, { useState, useEffect } from "react";
import SideMenu from "../components/NavigationMenu";
import { firestore, auth, storage } from "../firebase";

import { createUserWithEmailAndPassword } from "firebase/auth";


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
    const handleAdd = async (e) => {

    }
    {


        return (

            <div className="main" id="outer-container">
                <div id="page-wrap">
                    <h1>Verifier Page</h1>
                </div>
            </div>
        )
    }

}