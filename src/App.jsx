import React from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ForgotPassword from './pages/ForgetPassword';
import ProtectedRoute from "./components/ProtectedRoute";
import Dashboard from './pages/Dashboard';
import Login from "./pages/Login";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ResetPassword from "./pages/ResetPassword";
import "./app.css";
import ChangePassword from "./pages/ChangePassword";
import CreateAccountant from "./pages/CreateAccountant";
import AccountantList from "./pages/AccountantList";
import CreateSession from "./pages/CreateSession";
import SessionList from "./pages/SessionList";
import ClassList from "./pages/ClassList";
import CreateClass from "./pages/CreateClass";
import SectionList from "./pages/SectionList";
import CreateSection from "./pages/CreateSection";
 
function App() {

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} /> 
      <BrowserRouter>
       <Routes>

         {/* Public Route */}

        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forget-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />

          {/* Protected Route */}

        <Route path="/dashboard" element={ <ProtectedRoute> <Dashboard /> </ProtectedRoute>}/>
        <Route path="/change-password" element={ <ProtectedRoute> <ChangePassword/> </ProtectedRoute>}/>
        <Route path="/create-accountant" element={ <ProtectedRoute> <CreateAccountant/> </ProtectedRoute>} />
        <Route path="/accountant-list" element={ <ProtectedRoute> <AccountantList/> </ProtectedRoute>  } />
        <Route path="/create-session" element={ <ProtectedRoute><CreateSession/></ProtectedRoute>}/>
        <Route path="/session-list" element={ <ProtectedRoute> <SessionList/> </ProtectedRoute>  } />
         <Route path="/class-list" element={ <ProtectedRoute> <ClassList/> </ProtectedRoute> } />
        <Route path="/create-class" element={ <ProtectedRoute> <CreateClass/></ProtectedRoute>  } /> 
        <Route path="/section-list" element={<ProtectedRoute><SectionList></SectionList></ProtectedRoute>} /> 
        <Route path="/create-section" element={<ProtectedRoute><CreateSection></CreateSection></ProtectedRoute>} /> 
        
    </Routes>
    </BrowserRouter>
  </>
  )
}
export default App
