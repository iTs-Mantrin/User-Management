import React, {useState} from 'react'
import './updateUser.css'
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { useEffect } from 'react';


const UpdateUser = (props) => {
    const {id} = useParams();
    const navigate = useNavigate();
    
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
    });

    const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`https://reqres.in/api/users/${id}`);
        const userData = response.data.data;
        
        setFormData({
          firstName: userData.first_name,
          lastName: userData.last_name,
          email: userData.email,
        });
      } catch (err) {
        setError("Failed to fetch user details");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [id]);

      // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
   const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`https://reqres.in/api/users/${id}`, {
        first_name: formData.firstName,
        last_name: formData.lastName,
        email: formData.email,
      });

      alert("User updated successfully!");
      navigate("/"); 
    } catch (err) {
      setError("Failed to update user");
    }
  };

  if (loading) return <div>Loading user data...</div>;
  if (error) return <div className="error">{error}</div>;

    
    return (
        <div className="updateUserContainer">
            <div className="updateUserForm">
                <form action="" onSubmit={handleSubmit} className='form'>
                    <h2>Update User</h2>
                    <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        placeholder="First Name"
                        className="Input"
                    />
                    <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        placeholder="Last Name"
                        className="Input"
                    />
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Email"
                        className="Input"
                    />
                    <div className="action">
                        <button type="submit" className="btn">
                            Update
                        </button>
                        <button type="button" onClick={() => navigate("/")} className="btn">
                            Cancel
                        </button>
                    </div>

                </form>
            </div>
        </div>
    )
}

export default UpdateUser