import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Coursedetail.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faFilter } from '@fortawesome/free-solid-svg-icons';

function CourseDetail() {
  const [Courses, setCourses] = useState([]);
  const [searchQuery, setSearchQuery] = useState(""); // State for search query
  const [Category, setCategory] = useState([]); // State for categories
  const [selectedCategory, setSelectedCategory] = useState(""); // State for selected category

  useEffect(() => {
    // Fetch courses
    axios
      .get(`http://localhost:5000/admin/getcourses`)
      .then((res) => {
        console.log("API Response:", res.data); // Log the response to debug
        if (res.data && res.data.results) {
          setCourses(res.data.results); // Set the state with the response data
        } else {
          console.error("Unexpected API response structure:", res.data);
        }
      })
      .catch((error) => {
        console.error("Error fetching courses:", error);
      });

    // Fetch categories
    axios
      .get(`http://localhost:5000/admin/getcetegory`)
      .then((res) => {
        if (res.data && res.data.result) {
          setCategory(res.data.result);
        }
      })
      .catch((err) => {
        console.log("Error fetching categories:", err);
      });
  }, []);

  // Handle search input change
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  // Handle category selection change
  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  // Filter courses based on search query and selected category
  const filteredCourses = Courses.filter((course) => {
    const matchesSearch = course.coursename
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory
      ? course.course_category_id === Number(selectedCategory)
      : true;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="container-fluid bgfullpath mb-5">
      <div className="container card">
        <h3 className="text-start p-4">Course Overview</h3>
        <hr />
        <div className="row mb-3 align-items-center">
          <div className="col-sm-12 col-md-6 d-flex align-items-center">
            <FontAwesomeIcon icon={faSearch} className="me-2" />
            <input
              type="search"
              className="form-control"
              placeholder="Search courses..."
              value={searchQuery}
              onChange={handleSearchChange}
            />
          </div>
          <div className="col-sm-12 col-md-6 d-flex align-items-center">
            <FontAwesomeIcon icon={faFilter} className="me-2" />
            <select
              className="form-select"
              value={selectedCategory}
              onChange={handleCategoryChange}
            >
              <option value="">Sort by Course Category</option>
              {Category.map((e) => (
                <option key={e.course_category_id} value={e.course_category_id}>
                  {e.course_category_name}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="row">
          {filteredCourses.length > 0 ? (
            filteredCourses.map((e) => (
              <div className="col-sm-12 col-md-4 mb-3" key={e.course_id}>
                <div className="card">
                  <img
                    src={e.course_image}
                    className="card-img-top"
                    alt={e.coursename || "Course Image"}
                    onError={(e) => (e.target.src = "/default-image.jpg")} // Fallback image
                  />
                  <div className="card-body">
                    <h5 className="card-title">{e.coursename}</h5>
                    <p className="card-text text-truncate">
                      {e.course_desc}
                    </p>{" "}
                    {/* Truncate long descriptions */}
                    <Link to="/activecourse" className="btn btn-primary">
                      Enroll
                    </Link>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>No courses available</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default CourseDetail;
