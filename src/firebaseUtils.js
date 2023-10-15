import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { storage } from './firebase';

export const departments = ['Select Department', 'Computer Science', 'Engineering', 'Business', 'Other'];

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
