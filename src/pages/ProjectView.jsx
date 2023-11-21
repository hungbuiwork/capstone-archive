import React, { useState, useEffect } from "react";
import { collection, query, where, getDocs, limit } from "firebase/firestore";
import { firestore } from "../firebase";
import { Project } from "../components/Project";
import Fuse from 'fuse.js';

export const ProjectView = () => {
  const [projectData, setProjectData] = useState([]);
  const [selectedSponsor, setSelectedSponsor] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [sponsors, setSponsors] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [years, setYears] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [selectedFilters, setSelectedFilters] = useState({});
  const [projectsLimit, setProjectsLimit] = useState(12);

  useEffect(() => {
    const fetchUniqueValues = async () => {
      const uniqueSponsors = new Map();
      const uniqueDepartments = new Map();
      const uniqueYears = new Map();

      const querySnapshot = await getDocs(collection(firestore, "projects"));

      querySnapshot.forEach((doc) => {
        const data = doc.data();

        // Sponsors
        if (data.sponsor) {
          uniqueSponsors.set(data.sponsor, (uniqueSponsors.get(data.sponsor) || 0) + 1);
        }

        // Departments
        if (data.department) {
          uniqueDepartments.set(data.department, (uniqueDepartments.get(data.department) || 0) + 1);
        }

        // Years
        if (data.schoolYear) {
          uniqueYears.set(data.schoolYear, (uniqueYears.get(data.schoolYear) || 0) + 1);
        }
      });

      const sortedSponsors = Array.from(uniqueSponsors.entries()).sort();
      const sortedDepartments = Array.from(uniqueDepartments.entries()).sort();
      const sortedYears = Array.from(uniqueYears.entries()).sort();

      setSponsors(sortedSponsors);
      setDepartments(sortedDepartments);
      setYears(sortedYears);
    };

    fetchUniqueValues();
  }, []);

  useEffect(() => {
    const handleLoad = async () => {
      try {
        let queryRef = query(collection(firestore, "projects"));

        if (selectedFilters.sponsor) {
          queryRef = query(queryRef, where("sponsor", "==", selectedFilters.sponsor));
        }

        if (selectedFilters.department) {
          queryRef = query(queryRef, where("department", "==", selectedFilters.department));
        }

        if (selectedFilters.year) {
          queryRef = query(queryRef, where("schoolYear", "==", selectedFilters.year));
        }

        // Add a filter for the "verified" field
        queryRef = query(queryRef, where("verified", "==", true));

        // Limit the number of projects
        queryRef = query(queryRef, limit(projectsLimit));

        const documentSnapshot = await getDocs(queryRef);

        const projects = documentSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setProjectData(projects);
      } catch (error) {
        console.error("Error loading projects:", error);
      }
    };

    handleLoad();
  }, [selectedFilters, projectsLimit]);

  const handleFilter = () => {
    const fuse = new Fuse(projectData, {
      keys: ['description', 'title'], 
      includeScore: true,
      threshold: 0.4, 
    });

    const searchResults = fuse.search(searchQuery);
    setSearchResults(searchResults.map((result) => result.item));
  };

  const handleFilterClick = () => {
    setSelectedFilters({
      sponsor: selectedSponsor,
      department: selectedDepartment,
      year: selectedYear,
    });

    handleFilter();
  };

  const handleLoadMore = () => {
    setProjectsLimit((prevLimit) => prevLimit + 12);
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
            {sponsors.map(([sponsor, count]) => (
              <option key={sponsor} value={sponsor}>
                {`${sponsor} (${count})`}
              </option>
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
            {departments.map(([department, count]) => (
              <option key={department} value={department}>
                {`${department} (${count})`}
              </option>
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
            {years.map(([year, count]) => (
              <option key={year} value={year}>
                {`${year} (${count})`}
              </option>
            ))}
          </select>
        </div>

        <div className="m-2 flex flex-col">
          <label className="font-bold">SEARCH</label>
          <input
            className="rounded-md border-[1.5px] border-[#C4C4C4] p-2 text-sm w-48"
            type="text"
            placeholder="Search by description"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="m-2 flex flex-col justify-end">
          <button
            className="rounded-md border-[1.5px] border-blue-600 bg-blue-600 hover-bg-transparent hover-text-blue-600 duration-300 w-48 p-2 font-semibold text-white cursor-pointer"
            onClick={handleFilterClick}
          >
            FILTER
          </button>
        </div>
      </form>

      <div className="m-4 border-2 rounded-2xl flex flex-wrap justify-center">
        {searchResults.length > 0 ? (
          searchResults.map((project, i) => (
            <Project projectID={project.id} projectData={project} key={i} />
          ))
        ) : projectData.length > 0 ? (
          projectData.map((project, i) => (
            <Project projectID={project.id} projectData={project} key={i} />
          ))
        ) : (
          <p>No search results found</p>
        )}
      </div>

      {projectData.length >= projectsLimit && (
        <div className="flex justify-center mt-4">
          <button
            className="rounded-md border-[1.5px] border-blue-600 bg-blue-600 hover-bg-transparent hover-text-blue-600 duration-300 p-2 font-semibold text-white cursor-pointer"
            onClick={handleLoadMore}
          >
            Load More
          </button>
        </div>
      )}
    </div>
  );
};
