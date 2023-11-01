import React, {useState} from 'react'; 
import {firestore} from '../firebase';
import {addDoc,collection} from '@firebase/firestore';
import {getSchoolYears, uploadFile, departments, quarters} from '../firebaseUtils';
import { FormItem } from '../components/FormItem';

export const Upload = () => {
    const refs = {
      award: React.useRef(),
      company: React.useRef(),
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

    const [state, setState] = useState({
        awardChecked: false,
        endQuarter: 'Fall',
        imageUpload: null,
        logoUpload: null,
        otherDepartment: '',
        selectedDepartment: 'Select Department',
        selectedYear: `${new Date().getFullYear()}-${new Date().getFullYear()+1}`, 
        startQuarter: 'Fall',
        videoUpload: null
    });

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

    const isOtherSelected = state.selectedDepartment === 'Other';

    const handleSave = async(e) => {
        e.preventDefault();

        if (state.selectedDepartment === 'Select Department') {
            alert('Please select a department');
            return;
        }

        if (isOtherSelected && state.otherDepartment === '') {
            alert('Please enter the other department');
            return;
        }

        let selectedDepartmentValue = isOtherSelected ? state.otherDepartment : state.selectedDepartment;

        let data={
            company: refs.company.current.value,
            department: selectedDepartmentValue,
            description: refs.description.current.value,
            endQuarter: state.endQuarter,
            faculty: refs.faculty.current.value,
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

        // Upload logo
        if (state.logoUpload) {
            const logoUrl = await uploadFile(`logos/${state.logoUpload.name}`, state.logoUpload);
            data = { ...data, logoURL: logoUrl };
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
                    <input type="text" ref={refs.name} className="border rounded px-2 py-1" maxLength={50}></input>
                </FormItem>
                <FormItem label = "Project Description" tooltip = "Write a short description of your project!" required>
                    <textarea ref={refs.description} className="border rounded px-2 py-1 h-20" maxLength={200}></textarea>
                </FormItem>
                <FormItem label = "Team Members" tooltip = "Separate names by comma" required>
                    <textarea 
                    ref={refs.teamMembers} 
                    className="border rounded px-2 py-1 h-20"
                    placeholder='John Doe, Sarah Davis, etc ...'
                    ></textarea>
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
        
                    {isOtherSelected && (
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

    
    
                <FormItem label = "Partner(Company)" tooltip = "The company in partnership with the project" required>
                    <input type="text" ref={refs.company} className="border rounded px-2 py-1"></input>
                </FormItem>

                <FormItem label = "Partner Logo" tooltip = "Image URL to the company's logo" required>
                    <input type="file" onChange={(event) => {setState(prevState => ({...prevState, logoUpload: event.target.files[0]}))}} className="border rounded px-2 py-1 file-input file-input-primary"></input>
                </FormItem>

                <FormItem label = "Partner Liaisons" tooltip = "Company employee worked with. Separate by comma." required>
                    <textarea  className="border rounded px-2 py-1 h-20" placeholder='(currently nonfunctional) Jerry Joe, Bobby Balooza, etc...'></textarea>
                </FormItem>

                <h1 className=' font-extrabold text-2xl'>Other Project Information</h1>
    
                <FormItem label = "Project Image" tooltip = "A screenshot of your project.">
                    <input type="file" onChange={(event) => {setState(prevState => ({...prevState, imageUpload: event.target.files[0]}))}} className=" file-input file-input-bordered file-input-primary border rounded px-2 py-1"></input>
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