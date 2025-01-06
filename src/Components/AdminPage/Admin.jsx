import React, { useState } from 'react';
import { db, storage } from '../../firebase'; // Import Firestore and Storage from Firebase
import { collection, addDoc } from 'firebase/firestore';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';  // Import necessary storage functions

const UploadData = () => {
  const [name, setName] = useState('');
  const [Gender, setGender] = useState('');
  const [Color , setColor] = useState('');
  const [Category , setCategory] = useState('');
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [price , setPrice] = useState ('');

  // Function to handle image selection
  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]); // Set the selected image file
    }
  };

  // Function to upload data and image
  const handleSubmit = async () => {
    if (!name || !Category || !image || !price) {
      alert('Please provide all details, including an image.');
      return;
    }

    setUploading(true);  // Set uploading state to true

    // Reference to the storage path where image will be uploaded
    const storageRef = ref(storage, `images/${image.name}`);
    
    // Upload image to Firebase Storage
    const uploadTask = uploadBytesResumable(storageRef, image);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        // Optional: Track upload progress
      },
      (error) => {
        console.error('Image upload failed: ', error);
        alert('Error uploading image.');
        setUploading(false);
      },
      async () => {
        // Get image URL after upload
        const imageUrl = await getDownloadURL(uploadTask.snapshot.ref);

        try {
          // Add data to Firestore
          if(Gender == 'Men'){
            
          await addDoc(collection(db, 'Men'), {
            name: name,
            category: Category,
            gender : Gender,
            color : Color,
            price:price,
            imageUrl: imageUrl,
            createdAt: new Date(),
          });
          alert('Data uploaded successfully');
        }else{
          await addDoc(collection(db, 'Women'), {
            name: name,
            category: Category,
            gender : Gender,
            color : Color,
            price:price,
            imageUrl: imageUrl,
            createdAt: new Date(),
          });
          alert('Data uploaded successfully');
        }
        } catch (err) {
          console.error('Error adding document: ', err);
          alert('Error uploading data.');
        }
        setUploading(false);  // Reset uploading state
        setName('');
        setCategory('');
        setPrice('');

      }
    );
  };

  return (
    <div className='flex flex-col items-center m-2'>
      <h1 className='text-center my-7 text-3xl'>Upload Data to Firestore</h1>
    <div className='conatiner w-1/2  border-4 p-4 m-2'>
      
       {/* Name Field */}
       <div>
          <label className='text-xl my-2'>Name</label><br />
          <input
            type="text"
            className="input-div border-2 my-1 w-full"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        {/* Category Field */}
        <div>
          <label className='text-xl my-2'>Category</label><br />
          <input
            type="text"
            className="input-div border-2 my-1 w-full"
            value={Category}
            onChange={(e) => setCategory(e.target.value)}
          />
        </div>

        <div>
          <label className='text-xl my-2'>Gender</label><br />
          <input
            type="text"
            className="input-div border-2 my-1 w-full"
            value={Gender}
            onChange={(e) => setGender(e.target.value)}
          />
        </div>


        <div>
          <label className='text-xl my-2'>Color</label><br />
          <input
            type="text"
            className="input-div border-2 my-1 w-full"
            value={Color}
            onChange={(e) => setColor(e.target.value)}
          />
        </div>

        {/* Price Field */}
        <div>
          <label className='text-xl my-2'>Price</label><br />
          <input
            type="text"
            className="input-div border-2 my-1 w-full"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>

        {/* Image Upload */}
        <div>
          <label className='text-xl my-2'>Upload Image</label><br />
          <input className='text-xl my-2' type="file" accept="image/*" onChange={handleImageChange} />
        </div>

      {/* Submit Button */}
      <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 w-28 rounded-lg text-center my-2' onClick={handleSubmit} disabled={uploading}>
        {uploading ? 'Uploading...' : 'Upload'}
      </button>
    </div>
    </div>
  );
};

export default UploadData;
