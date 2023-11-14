import React, {useState, useEffect} from 'react'; 
import {firestore} from '../firebase';
import {addDoc,collection, getDocs} from '@firebase/firestore';
import {getSchoolYears, uploadFile, departments, quarters} from '../firebaseUtils';

export const Upload = () => {
    const refs = {
      award: React.useRef(),
      companyURL: React.useRef(),
      description: React.useRef(),
      faculty: React.useRef(),
      misc: React.useRef(),
      name: React.useRef(),
      poster: React.useRef(),
      slide: React.useRef(),
      teamMembers: React.useRef(),
      videoName: React.useRef()
    };
    
    const projectsRef = collection(firestore, 'projects');
    const companiesRef = collection(firestore, 'companies');

    const [companies, setCompanies] = useState([]);
    const [state, setState] = useState({
        awardChecked: false,
        endQuarter: 'Fall',
        imageUpload: null,
        logoUpload: null,
        otherCompany: '',
        otherDepartment: '',
        selectedCompany: 'Select Company',
        selectedDepartment: 'Select Department',
        selectedYear: `${new Date().getFullYear()}-${new Date().getFullYear()+1}`, 
        startQuarter: 'Fall',
        videoUpload: null
    });

    useEffect(() => {
        const fetchCompanies = async () => {
          //const companiesCollection = collection(firestore, 'companies');
          const querySnapshot = await getDocs(companiesRef);
          const companiesData = [];
          querySnapshot.forEach((doc) => {
            companiesData.push({
              id: doc.id,
              name: doc.data().name,
            });
          });
          setCompanies(companiesData);
        };
    
        fetchCompanies();
      }, []);

    const handleDepartmentChange = (e) => {
        const selectedValue = e.target.value;
        setState(prevState => ({...prevState, selectedDepartment: selectedValue}));

        if (selectedValue === 'Other') {
            setState(prevState => ({...prevState, otherDepartment: ''}));
        }
    };

    const handleOtherDepartmentChange = (e) => {
        setState(prevState => ({...prevState, otherDepartment: e.target.value}));
    };

    const handleCompanyChange = (e) => {
        const selectedValue = e.target.value;
        const selectedCompany = companies.find(company => company.name === selectedValue);
        setState(prevState => ({...prevState, selectedCompany: selectedCompany ? selectedCompany.id : selectedValue}));

        if (selectedValue === 'Add New Company') {
            setState(prevState => ({...prevState, otherCompany: ''}));
        }
    };

    const handleOtherCompanyChange = (e) => {
        setState(prevState => ({...prevState, otherCompany: e.target.value}));
    };

    const isOtherDeptSelected = state.selectedDepartment === 'Other';
    const isOtherCompSelected = state.selectedCompany === 'Add New Company';


    const handleSave = async(e) => {
        e.preventDefault();

        if (state.selectedDepartment === 'Select Department') {
            alert('Please select a department');
            return;
        }

        if (state.selectedCompany === 'Select Company') {
            alert('Please select a Company');
            return;
        }

        if (isOtherDeptSelected && state.otherDepartment === '') {
            alert('Please enter the other department');
            return;
        }

        if (isOtherCompSelected && state.otherCompany === '') {
            alert('Please enter the company details');
            return;
        }

        let selectedDepartmentValue = isOtherDeptSelected ? state.otherDepartment : state.selectedDepartment;
        let selectedCompanyValue = isOtherCompSelected ? state.otherCompany : state.selectedCompany;
        let companyData = {};
        let logoUrl = '';

        if (state.logoUpload) {
            logoUrl = await uploadFile(`logos/${state.logoUpload.name}`, state.logoUpload); 
        }

        if (isOtherCompSelected) {
            const companyData = { 
                companyName: state.otherCompany,
                logoURL: logoUrl,
                companyURL: refs.companyURL.current.value
            };
            const docRef = await addDoc(companiesRef, companyData);
            console.log('Company Added');
            selectedCompanyValue = docRef.id;
        } else {
            const selectedCompany = companies.find(company => company.id === selectedCompanyValue);
            companyData = selectedCompany;
        }

        let data={
            companyID: selectedCompanyValue,
            companyName: companyData.name,
            companyURL: companyData.companyURL,
            department: selectedDepartmentValue,
            description: refs.description.current.value,
            endQuarter: state.endQuarter,
            faculty: refs.faculty.current.value,
            logoURL: companyData.logoURL,
            misc: refs.misc.current.value,
            name: refs.name.current.value,
            poster: refs.poster.current.value,
            schoolYear: state.selectedYear,
            slide: refs.slide.current.value,
            startQuarter: state.startQuarter,
            teamMembers: refs.teamMembers.current.value,
            videoName: refs.videoName.current.value
        }
        
        // Award checkbox
        if (state.awardChecked) {
            data.award = refs.award.current.value;
        }

        // Upload image
        if (state.imageUpload) {
            const imageUrl = await uploadFile(`images/${state.imageUpload.name}`, state.imageUpload);
            data = { ...data, imageURL: imageUrl };
        }
/*
        // Upload logo
        if (state.logoUpload) {
            const logoUrl = await uploadFile(`logos/${state.logoUpload.name}`, state.logoUpload);
            data = { ...data, logoURL: logoUrl };
        }
*/
        // Upload video
        if (state.videoUpload) {
            const videoUrl = await uploadFile(`videos/${state.videoUpload.name}`, state.videoUpload);
            data = { ...data, videoURL: videoUrl };
        }

        // Add data to firestore
        try {
            await addDoc(projectsRef, data);
            console.log('Document successfully written!');
        } catch (error) {
            console.error('Error writing document:', error);
        }
    };
    return (
        <div className="flex flex-col items-center justify-center space-y-4">
            <form onSubmit={handleSave} className="flex flex-col items-center space-y-4">
                <label>Enter Project Name</label>
                <input type="text" ref={refs.name} className="border rounded px-2 py-1"></input>
    
                <label>Enter Team Members</label>
                <textarea ref={refs.teamMembers} className="border rounded px-2 py-1 h-20"></textarea>
    
                <label>Choose Department</label>
                <select value={state.selectedDepartment} onChange={handleDepartmentChange} className="border rounded px-2 py-1">
                    {departments.map((department) => (
                        <option key={department} value={department}>
                        {department}
                        </option>
                    ))}
                </select>
    
                {isOtherDeptSelected && (
                    <div>
                        <label>Other Department</label>
                        <input type="text" value={state.otherDepartment} onChange={handleOtherDepartmentChange} className="border rounded px-2 py-1" />
                    </div>
                )}
    
                <label>Enter Faculty</label>
                <textarea ref={refs.faculty} className="border rounded px-2 py-1 h-20"></textarea>
    
                <label>Choose Company</label>
                <select value={state.selectedCompany} onChange={handleCompanyChange} className="border rounded px-2 py-1">
                    <option value="Select Company">Select Company</option>
                    <option value='Add New Company'>Add New Company</option>
                    {companies.map((company) => (
                        <option key={company.id} value={company.name}>
                            {company.name}
                        </option>
                    ))}
                </select>
                {isOtherCompSelected && (
                <div className="flex flex-col items-center justify-center space-y-4">
                    <label>Enter New Company Name</label>
                    <input type="text" value={state.otherCompany} onChange={handleOtherCompanyChange} className="border rounded px-2 py-1"/>

                    <label>Upload Company Logo</label>
                    <input type="file" onChange={(event) => {setState(prevState => ({...prevState, logoUpload: event.target.files[0]}))}} className="border rounded px-2 py-1"></input>

                    <label>Enter Company URL</label>
                    <input type="text" ref={refs.companyURL} className="border rounded px-2 py-1"></input>
                </div>
                )}

                <label>Choose School Year</label>
                <select value={state.selectedYear} onChange={(e) => setState(prevState => ({...prevState, selectedYear: e.target.value}))} className="border rounded px-2 py-1">
                    {getSchoolYears().map((year) => (
                        <option key={year} value={year}>
                        {year}
                        </option>
                    ))}
                </select>
    
                <label>Start Quarter</label>
                <select value={state.startQuarter} onChange={(e) => setState(prevState => ({...prevState, startQuarter: e.target.value}))} className="border rounded px-2 py-1">
                    {quarters.map((quarter) => (
                        <option key={quarter} value={quarter}>
                        {quarter}
                        </option>
                    ))}
                </select>
    
                <label>End Quarter</label>
                <select value={state.endQuarter} onChange={(e) => setState(prevState => ({...prevState, endQuarter: e.target.value}))} className="border rounded px-2 py-1">
                    {quarters.map((quarter) => (
                        <option key={quarter} value={quarter}>
                        {quarter}
                        </option>
                    ))}
                </select>
    
                <label>Enter Description</label>
                <textarea ref={refs.description} className="border rounded px-2 py-1 h-20"></textarea>
    
                <label>Upload Image</label>
                <input type="file" onChange={(event) => {setState(prevState => ({...prevState, imageUpload: event.target.files[0]}))}} className="border rounded px-2 py-1"></input>
    
                {state.awardChecked && (
                    <div>
                        <label className="mr-2">Enter Award Name</label>
                        <input type="text" ref={refs.award} className="border rounded px-2 py-1"></input>
                    </div>
                )}

                <label>Upload Video</label>
                <input type="file" onChange={(event) => {setState(prevState => ({...prevState, videoUpload: event.target.files[0]}))}} className="border rounded px-2 py-1"></input>

                <label>Enter Video Name</label>
                <input type="text" ref={refs.videoName} className="border rounded px-2 py-1"></input>

                <label>Enter Misc. URL</label>
                <input type="text" ref={refs.misc} className="border rounded px-2 py-1"></input>

                <label>Enter Poster URL</label>
                <input type="text" ref={refs.poster} className="border rounded px-2 py-1"></input>

                <label>Enter Slides URL</label>
                <input type="text" ref={refs.slide} className="border rounded px-2 py-1"></input>
  
                <button type='submit' className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Submit</button>
            </form>
        </div>
    )
}