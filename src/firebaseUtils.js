import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { storage } from './firebase';

export const departments = ['Select Department', 'Computer Science', 'Engineering', 'Informatics', 'Statistics', 'Other'];
export const quarters = ['Fall', 'Winter', 'Spring', 'Summer'];

export const uploadFile = async (fileRefPath, file) => {
    const fileRef = ref(storage, fileRefPath);
    try {
        const snapshot = await uploadBytesResumable(fileRef, file);
        const downloadURL = await getDownloadURL(snapshot.ref);
        return downloadURL;
    } catch (error) {
        console.error('Error uploading file:', error);
        throw error;
    }
};

export function getSchoolYears() {
    const currentYear = new Date().getFullYear();
    const years = [];
    for(let i = currentYear; i >= 2020; i--) {
        years.push(`${i}-${i+1}`);
    }
    return years;
}
