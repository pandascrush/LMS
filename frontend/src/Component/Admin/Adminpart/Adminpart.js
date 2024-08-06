



import React, { useState, useEffect } from 'react';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'; // Ensure Bootstrap CSS is imported
import './Adminpart.css'; // Custom CSS for additional styling
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import Courseupdation from '../Courseupdation/Courseupdation';
import CourseDetail from '../../Coursedetail/Coursedetail';
import Coursecontent from '../Coursecontent/Coursecontent';
// import Mcq from '../MCQ/Mcq';
import InlineQuestion from '../Inlinequestion/Inlinequestion';
import { Link, NavLink } from 'react-router-dom';
import Courseobjective from '../Courseobjective/Courseobjective';
import Modulepage from '../Modulepage/Modulepage';
import Quilltxt from '../../Menubar/Quilltxt';


function AdminPart() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 991);
  const [activeSection, setActiveSection] = useState(localStorage.getItem('activeSection') || 'Dashboard');

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth <= 991);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    if (activeSection === 'CourseProject') {
      console.log("CourseProject section activated");
      // Add any other logic that needs to run when CourseProject is active
    }
  }, [activeSection]);

  useEffect(() => {
    localStorage.setItem('activeSection', activeSection);
  }, [activeSection]);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  const renderContent = () => {
    switch (activeSection) {
      case 'Dashboard':
        return <h2>Welcome to the Admin Panel</h2>;
      case 'Courses':
        return <CourseDetail />;
      case 'CourseProject':
        return (
          <div>
            <Courseupdation />
          </div>
        );
      case 'Coursecontent':
        return <Coursecontent />;
      case 'Settings':
        return (
          <div>
            <form>
              <div className="form-group">
                <label>Course Full Name</label>
                <input type='text' className="form-control" />
              </div>
            </form>
          </div>
        );
    
      case 'Activity':
        return (
          <div className='container-fluid adpart'>
            <div>
              <button className='btn btn-primary m-1'>Practise Exercise</button>
              <button className='btn btn-primary m-1'>Coding Question</button>
              <button className='btn btn-primary m-1'>Coding Area</button>
            </div>
          </div>
        );
      case 'Exercise':
        return <Quilltxt/>;
      case 'CodingQuestion':
        return <InlineQuestion />;
      case 'Area':
        return (
          <Link to="/coursedetail">AON</Link> 
        );
        case 'Courseobjective':
          return <Courseobjective/>;
        case 'Coursemodule':
          return <Modulepage/>;
        case 'Courseoutcome':
          return <h1>Outcome</h1>;
      default:
        return <h2>Welcome to the Admin Panel</h2>;
    }
  };

  return (
    <div className="container-fluid">
      {/* Top Navbar */}
      <Navbar bg="dark" variant="dark" expand="lg" className="mb-4">
        <Navbar.Brand href="#home">Admin Panel</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" onClick={toggleSidebar}>
          <FontAwesomeIcon icon={faBars} />
        </Navbar.Toggle>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto text-dark">
            <Nav.Link onClick={() => setActiveSection('Home')}>Home</Nav.Link>
            <Nav.Link onClick={() => setActiveSection('Features')}>Features</Nav.Link>
            <Nav.Link onClick={() => setActiveSection('Pricing')}>Pricing</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <div className="row">
        {/* Sidebar */}
        <div className={`col-md-2 sidebar bg-light ${isSidebarOpen ? 'open' : ''}`}>
          <div className="sidebar-header">
            <button className="close-btn" onClick={toggleSidebar}>
              <FontAwesomeIcon icon={faTimes} />
            </button>
          </div>
          <Nav className="flex-column">
            <Nav.Link onClick={() => setActiveSection('Dashboard')} className='text-dark'>Dashboard</Nav.Link>
            <Nav.Link onClick={() => setActiveSection('Courses')} className='text-dark'>Courses</Nav.Link>
            <Nav.Link onClick={() => setActiveSection('CourseProject')} className='text-dark'>Course Settings</Nav.Link>
            <NavDropdown title="Course Module" id="basic-nav-dropdown" className='text-dark'>
              <NavDropdown.Item onClick={() => setActiveSection('Coursemodule')} className='text-dark'>Course Module</NavDropdown.Item>
              <NavDropdown.Item onClick={() => setActiveSection('Courseobjective')} className='text-dark'>Course Objective</NavDropdown.Item>
              <NavDropdown.Item onClick={() => setActiveSection('Courseoutcome')} className='text-dark'>Course Outcome</NavDropdown.Item>
            </NavDropdown>
            <Nav.Link onClick={() => setActiveSection('Coursecontent')} className='text-dark'>Course Content</Nav.Link>
            <NavDropdown title="Activity" id="basic-nav-dropdown" className='text-dark'>
              <NavDropdown.Item onClick={() => setActiveSection('Exercise')} className='text-dark'>Practise Exercise</NavDropdown.Item>
              <NavDropdown.Item onClick={() => setActiveSection('CodingQuestion')} className='text-dark'>Coding Question</NavDropdown.Item>
              <NavDropdown.Item onClick={() => setActiveSection('Area')} className='text-dark'> Coding Area</NavDropdown.Item>
            </NavDropdown>
            <Nav.Link onClick={() => setActiveSection('Participants')} className='text-dark'>Participants</Nav.Link>
            <Nav.Link onClick={() => setActiveSection('Grade')} className='text-dark'>Grade</Nav.Link>
            <Nav.Link onClick={() => setActiveSection('DataHandling')} className='text-dark'>Data Handling</Nav.Link>
            <Nav.Link as={Link} to="/" className='text-dark'>Logout</Nav.Link>
          </Nav>
        </div>
        <div className={`col-md-10 ${isSidebarOpen ? 'content-open' : 'content-closed'}`}>
          <div className="content-area">
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminPart;
