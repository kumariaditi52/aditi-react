import { useState } from "react";
import axios from "axios";
import "../../css/productpage.css";
import { ToastContainer, toast } from 'react-toastify';
import UploadIcon from '@mui/icons-material/Upload';

export const Product_avail = () => {
  const [image, setImage] = useState(null);
  const [fruitData, setFruitData] = useState({
    name: '',
    price: '',
    quantity: '',
    nutrients: '',
    photo: '',
  });

  const handleChange = (e) => {
    setFruitData({ ...fruitData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFruitData({ ...fruitData, photo: e.target.files[0] });
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImage(imageUrl); // Set the image URL for displaying
    }
  };

  const handleProductSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', fruitData.name);
    formData.append('price', fruitData.price);
    formData.append('quantity', fruitData.quantity);
    formData.append('nutritions', fruitData.nutrients);
    formData.append('photo', fruitData.photo); // The file must be named 'photo'

    try {
      const response = await axios.post('/api/add-fruits', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log("Product saved successfully:", response.data);
      setTimeout(() => {
        toast.success("Product saved successfully");
        window.location.reload();
      }, 100);
    } catch (error) {
      console.error("Error saving product:", error);
      toast.error("Error saving product");
    }
  };

  return (
    <div className="product-avail-container">
      <form className="form-container" onSubmit={handleProductSubmit}>
        <ToastContainer />
        <input type="text" className="product-input" placeholder="Fruit Name :" name="name" onChange={handleChange} autoComplete="off" required />
        <input type="text" className="product-input" placeholder="Price :" name="price" onChange={handleChange} required />
        <input type="text" className="product-input" placeholder="Quantity :" name="quantity" onChange={handleChange} required />
        <input type="text" className="product-input" placeholder="Nutrients :" name="nutrients" onChange={handleChange} required />
        {/* <input type="file" className="product-input-img" name='photo' onChange={handleFileChange} accept="image/*" required /> */}
        <div className="file-upload-container">
          <input
            type="file"
            id="file-upload"
            style={{ display: "none" }} // Hide the input
            onChange={handleFileChange}
            required
          />
          <label htmlFor="file-upload" className="custom-file-upload-icon">
            <UploadIcon fontSize="large" style={{ cursor: 'pointer' }} />
          </label>
          <div className="image-preview">
            {image ? (
              <img src={image} alt="Uploaded" style={{ width: '100px', height: '100px', marginLeft: '10px' }} />
            ) : (
              <span>No photo uploaded</span>
            )}
          </div>
        </div>
        <button type="submit" className="product-submit">Submit</button>
      </form>
    </div>
  );
};
