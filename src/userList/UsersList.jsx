import React, { useEffect } from 'react'
import { useState } from 'react';
import './usersList.css'
import Card from '../card/Card';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const UsersList = () => {

    const navigate = useNavigate();

    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    

    const  fetchUsers = async (page) => {
        try {
            setLoading(true);
            setError(false);
            const response = await axios.get(`https://reqres.in/api/users?page=${page}`);
            // console.log(response.data);
            console.log(response.data);
            const data = response.data;
            setTotalPages(data.total_pages);
            if (data.data) {
                setUsers(data.data);
                setLoading(false);
            } 
            else {
                setError(data.error || "Failed to fetch users.");
                setLoading(false);
            }
        } catch (error) {
            setError(error.message);
            setLoading(false);
        }
    }
    
    useEffect(() => {
        fetchUsers(currentPage);
        console.log("Fetching users for page: ", currentPage);
    }
    , [currentPage]);


    const handleDelete = async (id) => {
        try {
            setLoading(true);
            setError(false);
    
            await axios.delete(`https://reqres.in/api/users/${id}`);
    
            setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
    
            setLoading(false);
            alert("User deleted successfully!");
        } catch (error) {
            setError("Failed to delete user");
            setLoading(false);
        }
    };
    

    const handleEdit = (id) => {
        navigate(`/updateuser/${id}`); 
      };


    if(loading) {
        return <div className="loading">Loading...</div>
    }
    if(error) { 
        return <div className="error">{error}</div>
    }

    return (
        <div className="userListContainer">
            <div className="heading">
                <h1>Users List</h1>
            </div>
            <div className="userList">
                {users.map((user) => (
                    <Card
                        key={user.id}
                        firstName={user.first_name}
                        lastName={user.last_name}
                        avatar={user.avatar}
                        onEdit={() => handleEdit(user.id)}
                        onDelete={() => handleDelete(user.id)}
                    />
                ))}
            </div>
            <div className="pagination">
                <button onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>
                    Previous
                </button>
                <span className="self-center">Page {currentPage} of {totalPages}</span>
                <button onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === totalPages}>
                    Next
                </button>
            </div>
        </div>
    )
}

export default UsersList