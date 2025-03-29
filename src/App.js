import React from "react";
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Login";
import UserList from "./userList/UsersList"
import UpdateUser from "./update/UpdateUser";
function App() {
  return (<>
  
    <Router>
      <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/userslist" element={<UserList />} />
          <Route path="/updateuser/:id" element={<UpdateUser />} />
      </Routes>
    </Router>
  </>
  );
}

export default App;
