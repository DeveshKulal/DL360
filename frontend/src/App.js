import './App.css';
import {BrowserRouter as Router, Routes, Route, } from 'react-router-dom'
import Home from './pages/Home';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';

import AdminDashBoard from './pages/Admin/AdminDashBoard';
import ManageUsers from './pages/Admin/ManageUsers';
import ManageVehicles from './pages/Admin/ManageVehicles';
import ViewComplaints from './pages/Admin/ViewComplaints';
import AdminDashBoardContent from './pages/Admin/AdminDashBoardContent';
import UserDashboard from './pages/User/UserDashboard';
import UserDashBoardContent from './pages/User/UserDashBoardContent';
import ApplyLlr from './pages/User/ApplyLlr';
import ApplyDlRenewal from './pages/User/ApplyDlRenewal';
import ViewEmissionTest from './pages/User/ViewEmissionTest';

import StaffDashBoardContent from './pages/Staff/StaffDashBoardContent';
import AddFir from './pages/Staff/AddFir';
import ApproveLlr from './pages/Staff/ApproveLlr';
import ApproveDlRenewal from './pages/Staff/ApproveDlRenewal';
import ApplyEmissionTest from './pages/Staff/ApplyEmissionTest';
import StaffDashboard from './pages/Staff/StaffDashboard';


function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/login' element={<Login/>} />
          <Route path='/register' element={<Register/>} />
          <Route path='/admin' element={<AdminDashBoard/>}>
            <Route path='dashboard' element={<AdminDashBoardContent/>}/>
            <Route path='users' element={<ManageUsers/>}/>
            <Route path='vehicles' element={<ManageVehicles/>}/>
            <Route path='complaints' element={<ViewComplaints/>}/>
          </Route>
          <Route path='/staff' element={<StaffDashboard/>}>
            <Route path='dashboard' element={<StaffDashBoardContent/>}/>
            <Route path='add-fir' element={<AddFir/>}/>
            <Route path='apply-emission-test' element={<ApplyEmissionTest/>}/>
            <Route path='approve-llr' element={<ApproveLlr/>}/>
            <Route path='approve-dl-renewal' element={<ApproveDlRenewal/>}/>
          </Route>
          <Route path='/user' element={<UserDashboard/>}>
            <Route path='dashboard' element={<UserDashBoardContent/>}/>
            <Route path='apply-llr' element={<ApplyLlr/>}/>
            <Route path='apply-dl-renewal' element={<ApplyDlRenewal/>}/>
            <Route path='view-emission-test' element={<ViewEmissionTest/>}/>
          </Route>
          
        </Routes>
      </Router>
    </>
  );
}

export default App;
