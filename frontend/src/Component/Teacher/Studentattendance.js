import React from 'react';
import "./Studentattendance.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faDownload } from '@fortawesome/free-solid-svg-icons';
function Studentattendance() {
  return (
    <div className='container-fluid'>
        <h3 className='txtteacher'>Welcome to Teacher Dashboard</h3>
        <div className='d-flex justify-content-between my-4'>
        <p className='bold'><FontAwesomeIcon icon={faAngleLeft} className='arrow mx-3' />Attendance List</p>
        <div>
        <select className='mx-2'>
            <option >Select the class</option>
            <option>BSC IT</option>
            <option>BSC CT</option>
        </select>
        <select>
            <option>Select the Status</option>
            <option value="Approved">Approved</option>
            <option value="Unapproved">Unapproved</option>
        </select>
        </div>
        </div>
        <div className='container'>
        <table className='w-100 table-box-shadow mt-5'>
            <thead>
                <tr className='headrow'>
                    <th>Roll.No</th>
                    <th>Name</th>
                    <th>Department</th>
                    <th>Location</th>
                    <th>Approval Status</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>1</td>
                    <td>Dev</td>
                    <td>Bsc</td>
                    <td>Coimbatore</td>
                    <td><input type="checkbox"/><label className='text-success'>Approved</label> 
                    <input type="checkbox" className='ms-4'/><label className='text-danger'>Unapproved</label>
                    </td>
                </tr>
                <tr>
                    <td>1</td>
                    <td>Dev</td>
                    <td>Bsc</td>
                    <td>Coimbatore</td>
                    <td><input type="checkbox" className='text-success'/><label className='text-success'>Approved</label>  
                    <input type="checkbox" className='ms-4 text-danger'/><label className='text-danger'>Unapproved</label>
                    </td>
                </tr>
            </tbody>
        </table>
        <button className='my-4 downbtn p-1 rounded-2'>Download<FontAwesomeIcon icon={faDownload} className='px-1'/></button>
        </div>    
    </div>
  )
}

export default Studentattendance