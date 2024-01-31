import React, { useState, useEffect } from "react";
import { collection, query, where, getDocs, limit } from "firebase/firestore";
import { firestore, apiKey } from "../firebase";
import { Project } from "../components/Project";
import Fuse from "fuse.js";

export const ProjectView = () => {
  // State variables for storing project data, selected filters, and search results
  const [projectData, setProjectData] = useState([]);
  const [selectedSponsor, setSelectedSponsor] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedLevel, setSelectedLevel] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [sponsors, setSponsors] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [years, setYears] = useState([]);
  const [levels, setLevels] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [selectedFilters, setSelectedFilters] = useState({});
  const [projectsLimit, setProjectsLimit] = useState(12);

  // Effect hook to fetch unique values for filters on component mount
  useEffect(() => {
    const fetchUniqueValues = async () => {
      // Maps to store unique values
      const uniqueCompanies = new Map();
      const uniqueDepartments = new Map();
      const uniqueYears = new Map();
      const uniqueLevels = new Map();

      console.log('start')

      // Fetch all projects from Firestore
      const querySnapshot = await getDocs(collection(firestore, "projects"));

      // Iterate over each document and update the unique value maps
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        if (data.company) {
          uniqueCompanies.set(data.company, (uniqueCompanies.get(data.company) || 0) + 1);
        }
        if (data.department) {
          uniqueDepartments.set(data.department, (uniqueDepartments.get(data.department) || 0) + 1);
        }
        if (data.schoolYear) {
          uniqueYears.set(data.schoolYear, (uniqueYears.get(data.schoolYear) || 0) + 1);
        }
        if (data.level) {
          uniqueLevels.set(data.level, (uniqueLevels.get(data.level) || 0) + 1);
        }
      });

      // Update state with sorted arrays of unique values
      setSponsors(Array.from(uniqueCompanies.entries()).sort());
      setDepartments(Array.from(uniqueDepartments.entries()).sort());
      setYears(Array.from(uniqueYears.entries()).sort());
      setLevels(Array.from(uniqueLevels.entries()).sort());
    };

    fetchUniqueValues();
  }, []);

  // Effect hook to load projects based on selected filters and limit
  useEffect(() => {
    const handleLoad = async () => {
      try {
        // Start with a query for all projects
        let queryRef = query(collection(firestore, "projects"));

        // Add where clauses for each selected filter
        if (selectedFilters.sponsor) {
          queryRef = query(queryRef, where("company", "==", selectedFilters.sponsor));
        }
        if (selectedFilters.department) {
          queryRef = query(queryRef, where("department", "==", selectedFilters.department));
        }
        if (selectedFilters.year) {
          queryRef = query(queryRef, where("schoolYear", "==", selectedFilters.year));
        }
        if (selectedFilters.level) {
          queryRef = query(queryRef, where("level", "==", selectedFilters.level));
        }

        // Only include verified projects and limit the number of results
        queryRef = query(queryRef, where("verified", "==", true));
        queryRef = query(queryRef, limit(projectsLimit));

        // Fetch the documents and update state with the results
        const documentSnapshot = await getDocs(queryRef, {
          headers: {
            Authorization: `Bearer ${apiKey}`,
          },
        });
        const projects = documentSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setProjectData(projects);
      } catch (error) {
        console.error("Error loading projects:", error);
      }
    };

    handleLoad();
  }, [selectedFilters, projectsLimit]);

  // Function to filter projects based on search query
  const handleFilter = () => {
    // Initialize Fuse with the project data and search options
    const fuse = new Fuse(projectData, {
      keys: ["description", "title"],
      includeScore: true,
      threshold: 0.4,
    });

    // Perform the search and update state with the results
    const results = fuse.search(searchQuery);
    setSearchResults(results.map((result) => result.item));
  };

  // Function to update selected filters and trigger a search
  const handleFilterClick = () => {
    setSelectedFilters({
      sponsor: selectedSponsor,
      department: selectedDepartment,
      year: selectedYear,
      level: selectedLevel,
    });
    handleFilter();
  };

  // Function to load more projects
  const handleLoadMore = () => {
    setProjectsLimit((prevLimit) => prevLimit + 12);
  };




  return (
    <div className="text-[#313144]">
      <form className="flex justify-center flex-wrap mt-12" action="#">
        {/* Sponsor Filter */}
        <div className="m-2 flex flex-col">
          <label className="font-bold">PARTNERS</label>
          <select
            className="rounded-md border-[1.5px] border-[#C4C4C4] w-48 p-2 font-semibold text-sm"
            value={selectedSponsor}
            onChange={(e) => setSelectedSponsor(e.target.value)}
          >
            <option value="">All</option>
            {sponsors.map(([company]) => (
              <option key={company} value={company}>{company}</option>
            ))}
          </select>
        </div>

        {/* Department Filter */}
        <div className="m-2 flex flex-col">
          <label className="font-bold">DEPARTMENTS</label>
          <select
            className="rounded-md border-[1.5px] border-[#C4C4C4] w-48 p-2 font-semibold text-sm"
            value={selectedDepartment}
            onChange={(e) => setSelectedDepartment(e.target.value)}
          >
            <option value="">All</option>
            {departments.map(([department]) => (
              <option key={department} value={department}>{department}</option>
            ))}
          </select>
        </div>

        {/* Year Filter */}
        <div className="m-2 flex flex-col">
          <label className="font-bold">YEAR</label>
          <select
            className="rounded-md border-[1.5px] border-[#C4C4C4] w-48 p-2 font-semibold text-sm"
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
          >
            <option value="">All</option>
            {years.map(([year]) => (
              <option key={year} value={year}>{year}</option>
            ))}
          </select>
        </div>

        {/* Level Filter */}
        <div className="m-2 flex flex-col">
          <label className="font-bold">EDUCATION LEVEL</label>
          <select
            className="rounded-md border-[1.5px] border-[#C4C4C4] w-48 p-2 font-semibold text-sm"
            value={selectedLevel}
            onChange={(e) => setSelectedLevel(e.target.value)}
          >
            <option value="">All</option>
            {levels.map(([level]) => (
              <option key={level} value={level}>{level}</option>
            ))}
          </select>
        </div>

        {/* Search Filter */}
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

        {/* Filter Button */}
        <div className="m-2 flex flex-col justify-end">
          <button
            className="rounded-md border-[1.5px] border-blue-600 bg-blue-600 hover-bg-transparent hover-text-blue-600 duration-300 w-48 p-2 font-semibold text-white cursor-pointer"
            onClick={handleFilterClick}
          >
            FILTER
          </button>
        </div>
      </form>

      {/* Project Display */}
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

      {/* Load More Button */}
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
