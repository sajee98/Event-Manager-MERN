import { useState } from "react";
import axios from "axios";

const VendorRegister = () => {
  const [formData, setFormData] = useState({
    vendorName: "",
    vendorAddress: "",
    category: "",
    title: "",
    aboutUs: "",
    phoneNo: "",
    email: "",
    image: "", // single image link
  });

  const [images, setImages] = useState([]); // multiple image files

  // handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // handle multiple image selection
  const handleImageChange = (e) => {
    setImages(Array.from(e.target.files));
  };

  // handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    Object.keys(formData).forEach((key) => {
      data.append(key, formData[key]);
    });

    images.forEach((file) => {
      data.append("images", file); // backend expects "images"
    });

    try {
      const res = await axios.post("http://localhost:3000/api/vendors", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      console.log("Inserted:", res.data);
      alert("Vendor registered successfully!");
    } catch (err) {
      console.error("Axios Error:", err);
      alert("Failed to register vendor. Check console for details.");
    }
  };

  return (
    <div className="bg-gray-100 mx-auto max-w-6xl  py-20 px-12 lg:px-24 shadow-xl mb-24">
      <form onSubmit={handleSubmit}>
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col">

          {/* Vendor Name */}
          <div className="mb-6">
            <label className="block text-sm font-bold mb-2">Vendor Name*</label>
            <input
              name="vendorName"
              value={formData.vendorName}
              onChange={handleChange}
              className="w-full bg-gray-200 border rounded py-3 px-4"
              type="text"
              required
            />
          </div>

          {/* Vendor Address */}
          <div className="mb-6">
            <label className="block text-sm font-bold mb-2">Vendor Address*</label>
            <input
              name="vendorAddress"
              value={formData.vendorAddress}
              onChange={handleChange}
              className="w-full bg-gray-200 border rounded py-3 px-4"
              type="text"
              required
            />
          </div>

          {/* Category */}
          <div className="mb-6">
            <label className="block text-sm font-bold mb-2">Category*</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full bg-gray-200 border rounded py-3 px-4"
              required
            >
              <option value="">Select Category</option>
              <option value="Photography">Photography</option>
              <option value="Decoration">Decoration</option>
              <option value="Food">Food</option>
            </select>
          </div>

          {/* Title */}
          <div className="mb-6">
            <label className="block text-sm font-bold mb-2">Title*</label>
            <input
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full bg-gray-200 border rounded py-3 px-4"
              type="text"
              required
            />
          </div>

          {/* About Us */}
          <div className="mb-6">
            <label className="block text-sm font-bold mb-2">About Us*</label>
            <textarea
              name="aboutUs"
              value={formData.aboutUs}
              onChange={handleChange}
              className="w-full bg-gray-200 border rounded py-3 px-4"
              required
            />
          </div>

          {/* Phone Number */}
          <div className="mb-6">
            <label className="block text-sm font-bold mb-2">Phone No*</label>
            <input
              name="phoneNo"
              value={formData.phoneNo}
              onChange={handleChange}
              className="w-full bg-gray-200 border rounded py-3 px-4"
              type="tel"
              required
            />
          </div>

          {/* Email */}
          <div className="mb-6">
            <label className="block text-sm font-bold mb-2">Email*</label>
            <input
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full bg-gray-200 border rounded py-3 px-4"
              type="email"
              required
            />
          </div>

          {/* Single Image Link */}
          <div className="mb-6">
            <label className="block text-sm font-bold mb-2">Image Link*</label>
            <input
              name="image"
              value={formData.image}
              onChange={handleChange}
              className="w-full bg-gray-200 border rounded py-3 px-4"
              type="text"
              placeholder="http://..."
              required
            />
          </div>

          {/* Multiple Images */}
          <div className="mb-6">
            <label className="block text-sm font-bold mb-2">Upload Images*</label>
            <input
              name="images"
              onChange={handleImageChange}
              className="w-full bg-gray-200 border rounded py-3 px-4"
              type="file"
              accept="image/*"
              multiple
              required
            />
          </div>

          {/* Submit */}
          <div className="mt-4">
            <button
              type="submit"
              className="w-full bg-gray-900 text-white font-bold py-2 px-4 rounded-full hover:bg-gray-700"
            >
              Submit
            </button>
          </div>

        </div>
      </form>
    </div>
  );
};

export default VendorRegister;
