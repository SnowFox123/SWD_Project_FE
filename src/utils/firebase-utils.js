// // firebase-utils.js
// import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
// import { storage } from '../config/firebase-config'; // Adjust the path based on your project structure

// export const uploadImageToFirebase = async (file) => {
//   if (!file) return null;

//   try {
//     const storageRef = ref(storage, `ToyImage/${file.name}`); // Adjust path if needed
//     const snapshot = await uploadBytes(storageRef, file); // Upload the file
//     const downloadURL = await getDownloadURL(snapshot.ref); // Get the download URL
//     return downloadURL; // Return the download URL
//   } catch (error) {
//     console.error('Error uploading image:', error);
//     throw error; // Rethrow the error to be caught in the caller
//   }
// };
