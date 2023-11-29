import React, { useState, useEffect } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { firestore } from "../firebase";
import CompanyProjects from '../components/CompanyProjects';
import Fuse from 'fuse.js';

export const ProjectView = () => {
  const [selectedSponsor, setSelectedSponsor] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [sponsors, setSponsors] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [years, setYears] = useState([]);
  
  useEffect(() => {
    const fetchUniqueValues = async () => {
      const uniqueCompanies = new Map();
      const uniqueDepartments = new Map();
      const uniqueYears = new Map();

      try {
        const querySnapshot = await getDocs(collection(firestore, "projects"));

        querySnapshot.forEach((doc) => {
          const data = doc.data();
          if (data.verified) {
            if (data.company) {
              uniqueCompanies.set(data.company, (uniqueCompanies.get(data.company) || 0) + 1);
            }
            if (data.department) {
              uniqueDepartments.set(data.department, (uniqueDepartments.get(data.department) || 0) + 1);
            }
            if (data.schoolYear) {
              uniqueYears.set(data.schoolYear, (uniqueYears.get(data.schoolYear) || 0) + 1);
            }
          }
        });

        setSponsors(Array.from(uniqueCompanies.entries()).sort());
        setDepartments(Array.from(uniqueDepartments.entries()).sort());
        setYears(Array.from(uniqueYears.entries()).sort());
      } catch (error) {
        console.error("Error fetching unique values:", error);
      }
    };

    fetchUniqueValues();
  }, []);

  const handleFilterClick = (e) => {
    e.preventDefault();
    // Implement the logic for filtering the CompanyProjects accordion view based on selected filters
  };

  return (
    <div className="text-[#313144]">
      <form className="flex justify-center flex-wrap mt-12" action="#">
        <div className="m-2 flex flex-col">
          <label className="font-bold">PARTNERS</label>
          <select
            className="rounded-md border-[1.5px] border-[#C4C4C4] w-48 p-2 font-semibold text-sm"
            value={selectedSponsor}
            onChange={(e) => setSelectedSponsor(e.target.value)}
          >
            <option value="">All</option>
            {sponsors.map(([company, _]) => (
              <option key={company} value={company}>{company}</option>
            ))}
          </select>
        </div>
        <div className="m-2 flex flex-col">
          <label className="font-bold">DEPARTMENTS</label>
          <select
            className="rounded-md border-[1.5px] border-[#C4C4C4] w-48 p-2 font-semibold text-sm"
            value={selectedDepartment}
            onChange={(e) => setSelectedDepartment(e.target.value)}
          >
            <option value="">All</option>
            {departments.map(([department, _]) => (
              <option key={department} value={department}>{department}</option>
            ))}
          </select>
        </div>
        <div className="m-2 flex flex-col">
          <label className="font-bold">YEAR</label>
          <select
            className="rounded-md border-[1.5px] border-[#C4C4C4] w-48 p-2 font-semibold text-sm"
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
          >
            <option value="">All</option>
            {years.map(([year, _]) => (
              <option key={year} value={year}>{year}</option>
            ))}
          </select>
        </div>
        <div className="m-2 flex flex-col justify-end">
          <button
            type="button"
            className="rounded-md border-[1.5px] border-blue-600 bg-blue-600 hover-bg-transparent hover-text-blue-600 duration-300 w-48 p-2 font-semibold text-white cursor-pointer"
            onClick={handleFilterClick}
          >
            FILTER
          </button>
        </div>
      </form>

      <div className="mt-4">
        {sponsors.map(([company]) => (
          <CompanyProjects key={company} companyName={company} />
        ))}
      </div>
    </div>
  );
};
