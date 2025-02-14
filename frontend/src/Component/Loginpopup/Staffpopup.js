// import React from 'react'
// import "./Staffpopup.css";
// import bellimg from "../../Asset/bell.png";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
// import { FaEnvelope } from 'react-icons/fa';
// function Staffpopup() {
//   return (
//     <div className='container d-flex flex-column justify-content-center align-items-center'>
//       <div className='card p-4'>
//         <img src={bellimg} />
//         <h4>Pending Approvals Remainder</h4>
//         <div className="message-icon-container mt-3">
//           <FontAwesomeIcon icon={faEnvelope} className="message-icon orgicon" />
//           <span className="badge text-dark">3</span>
//         </div>
//         <button className='orangebtn m-5'>Go to Approve</button>
//         </div>  
//     </div>
//   )
// }

// export default Staffpopup


import React from 'react';
import "./Staffpopup.css";
import bellimg from "../../Asset/bell.png";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faBell } from '@fortawesome/free-solid-svg-icons'; // Import the bell icon

function Staffpopup() {
  return (
    <div className='container d-flex flex-column justify-content-center align-items-center mt-5'>
      <div className='card px-4 py-3 text-center'>
        <img src={bellimg} alt="Notification Bell" className="mb-3" />
        <h4>Pending Approvals Reminder</h4>
        
        <div className="icons-container mt-3">
          <div className="icon-with-badge">
            <FontAwesomeIcon icon={faEnvelope} className="message-icon orgicon" />
            <span className="badge">3</span> {/* Message count */}
          </div>
        </div>
        <button className='orangebtn mt-5 rounded-2'>Go to Approve</button>
      </div>
    </div>
  );
}

export default Staffpopup;
