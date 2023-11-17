import React, {useState, useEffect} from 'react'; 
import {firestore} from '../firebase';
import {addDoc,collection, getDocs} from '@firebase/firestore';
import {getSchoolYears, uploadFile, departments, quarters} from '../firebaseUtils';
import { FormItem } from '../components/FormItem';

export const Upload = () => {
    const refs = {
      award: React.useRef(),
      companyURL: React.useRef(),
      description: React.useRef(),
      faculty: React.useRef(),
      liasons: React.useRef(),
      misc: React.useRef(),
      projectName: React.useRef(),
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
              companyName: doc.data().companyName,
              logoURL: doc.data().logoURL,
              companyURL: doc.data().companyURL,
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
        const selectedCompany = companies.find(company => company.companyName === selectedValue);
        setState(prevState => ({...prevState, selectedCompany: selectedCompany ? selectedCompany.id : selectedValue}));

        if (selectedValue === 'Add New Company') {
            setState(prevState => ({...prevState, otherCompany: ''}));
        } else {
            setState(prevState => ({...prevState, selectedCompany: selectedValue, otherCompany: ''}));
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
            companyData = { 
                companyName: state.otherCompany,
                logoURL: logoUrl,
                companyURL: refs.companyURL.current.value
            };
            const docRef = await addDoc(companiesRef, companyData);
            console.log('Company Added');
            selectedCompanyValue = docRef.id;
        } else {
            const selectedCompany = companies.find(company => company.companyName === selectedCompanyValue);
            companyData = selectedCompany;
            console.log('Company: ', companyData);
            selectedCompanyValue = companyData.id;
        }

        let data={
            companyID: selectedCompanyValue,
            companyName: companyData.companyName,
            companyURL: companyData.companyURL,
            department: selectedDepartmentValue,
            description: refs.description.current.value,
            endQuarter: state.endQuarter,
            faculty: refs.faculty.current.value,
            liasons: refs.liasons.current.value,
            logoURL: companyData.logoURL,
            misc: refs.misc.current.value,
            projectName: refs.projectName.current.value,
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
            <form onSubmit={handleSave} className="flex flex-col space-y-4">
                {/*BASIC PROJECT INFO*/}
                <h1 className=' font-extrabold text-2xl'>Project Information</h1>

                <FormItem label = "Project Title" required>
                    <input type="text" ref={refs.projectName} className="border rounded px-2 py-1" maxLength={50}></input>
                </FormItem>

                <FormItem label = "Project Description" tooltip = "Write a short description of your project!" required>
                    <textarea ref={refs.description} className="border rounded px-2 py-1 h-20" maxLength={200}></textarea>
                </FormItem>

                <FormItem label = "Team Members" tooltip = "Separate names by comma" required>
                    <textarea ref={refs.teamMembers} className="border rounded px-2 py-1 h-20" placeholder='John Doe, Sarah Davis, etc ...'></textarea>
                </FormItem>

                {/*Course Information*/}
                <h1 className=' font-extrabold text-2xl'>Course Information</h1>

                <FormItem label = "Faculty Advisors" required>
                    <textarea ref={refs.faculty} className="border rounded px-2 py-1 h-20" placeholder='Hadar Ziv, Shannon Alfaro, etc...'></textarea>
                </FormItem>

                <FormItem label = "Department" tooltip = "Select what department the course is in" required>
                    <select value={state.selectedDepartment} onChange={handleDepartmentChange} className="border rounded px-2 py-1">
                        {departments.map((department) => (
                            <option key={department} value={department}>
                            {department}
                            </option>
                        ))}
                    </select>
        
                    {isOtherDeptSelected && (
                        <div>
                            <label> Other : </label>
                            <input type="text" value={state.otherDepartment} onChange={handleOtherDepartmentChange} className="border rounded px-2 py-1" />
                        </div>
                    )}
                </FormItem>

                <FormItem label = "SchoolYear" tooltip = "The schoolyear this project was worked on" required>
                    <select value={state.selectedYear} onChange={(e) => setState(prevState => ({...prevState, selectedYear: e.target.value}))} className="border rounded px-2 py-1">
                        {getSchoolYears().map((year) => (
                            <option key={year} value={year}>
                            {year}
                            </option>
                        ))}
                    </select>
                </FormItem>

                <FormItem label = "Start Quarter" required>
                    <select value={state.startQuarter} onChange={(e) => setState(prevState => ({...prevState, startQuarter: e.target.value}))} className="border rounded px-2 py-1">
                        {quarters.map((quarter) => (
                            <option key={quarter} value={quarter}>
                            {quarter}
                            </option>
                        ))}
                    </select>
                </FormItem>

                <FormItem label = "End Quarter" required>
                    <select value={state.endQuarter} onChange={(e) => setState(prevState => ({...prevState, endQuarter: e.target.value}))} className="border rounded px-2 py-1">
                        {quarters.map((quarter) => (
                            <option key={quarter} value={quarter}>
                            {quarter}
                            </option>
                        ))}
                    </select>
                </FormItem>

                {/*Partner Information*/}
                <h1 className=' font-extrabold text-2xl'>Partner Information</h1>
                
                <FormItem label="Choose Company" required>
                <select value={state.selectedCompany} onChange={handleCompanyChange} className="border rounded px-2 py-1">
                    <option value="Select Company">Select Company</option>
                    <option value="Add New Company">Add New Company</option>
                    {companies.map((company) => (
                    <option key={company.id} value={company.companyName}>
                        {company.companyName}
                    </option>
                    ))}
                </select>
        
                {isOtherCompSelected && (
                    <div>
                    <FormItem label="Enter New Company Name">
                        <input type="text" value={state.otherCompany} onChange={handleOtherCompanyChange} className="border rounded px-2 py-1" />
                    </FormItem>
        
                    <FormItem label="Upload Company Logo">
                        <input type="file" onChange={(event) => { setState(prevState => ({...prevState, logoUpload: event.target.files[0] })) }} className="border rounded px-2 py-1" />
                    </FormItem>
        
                    <FormItem label="Enter Company URL">
                        <input type="text" ref={refs.companyURL} className="border rounded px-2 py-1"/>
                    </FormItem>
                    </div>
                )}
                </FormItem>

                <FormItem label = "Partner Liaisons" tooltip = "Company employee worked with. Separate by comma." required>
                    <textarea ref={refs.liasons} className="border rounded px-2 py-1 h-20" placeholder='John Doe, Sarah Davis, etc ...'></textarea>
                </FormItem>

                <h1 className=' font-extrabold text-2xl'>Other Project Information</h1>

                <FormItem label = "Project Image" tooltip = "A screenshot of your project.">
                    <input type="file" onChange={(event) => {setState(prevState => ({...prevState, imageUpload: event.target.files[0]}))}} className="file-input file-input-bordered file-input-primary border rounded px-2 py-1"></input>
                </FormItem>

                {/* For now no awards */}
                {state.awardChecked && (
                    <div>
                        <label className="mr-2">Enter Award Name</label>
                        <input type="text" ref={refs.award} className="border rounded px-2 py-1"></input>
                    </div>
                )}

                <FormItem label = "Project Video">
                    <label className=''>Title</label>
                    <input type="text" ref={refs.videoName} className="border rounded px-2 py-1"></input>
                    <label className=''>Upload</label>
                    <input type="file" onChange={(event) => {setState(prevState => ({...prevState, videoUpload: event.target.files[0]}))}} className="border rounded px-2 py-1 file-input file-input-bordered file-input-primary"></input>
                </FormItem>

                <FormItem label = "Poster URL">
                    <input type="text" ref={refs.poster} className="border rounded px-2 py-1"></input>
                </FormItem>

                <FormItem label = "Slides URL">
                    <input type="text" ref={refs.slide} className="border rounded px-2 py-1"></input>   
                </FormItem>


                <FormItem label = "Misc URL">
                    <input type="text" ref={refs.misc} className="border rounded px-2 py-1"></input>
                </FormItem>

                <button type='submit' className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Submit</button>
            </form>
        </div>
    )
}