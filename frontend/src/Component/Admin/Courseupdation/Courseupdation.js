import React, { useEffect, useState } from "react";
import "./Courseupdation.css"; // Import your CSS file
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Courseupdation() {
  const [category, setCategory] = useState([]);
  const [coursename, setCoursename] = useState("");
  const [course_short_name, setCourseShortName] = useState("");
  const [course_category_id, setCourseCategory] = useState("");
  const [course_visible, setCourseVisibility] = useState("Students");
  const [course_start_date, setCourseStartDate] = useState("");
  const [course_end_date, setCourseEndDate] = useState("");
  const [course_image, setCourseImage] = useState(null);
  const [course_desc, setCourseDescription] = useState("");

  useEffect(() => {
    axios.get(`http://localhost:5000/admin/getcetegory`).then((res) => {
      setCategory(res.data.result);
    });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("coursename", coursename);
    formData.append("course_short_name", course_short_name);
    formData.append("course_category_id", course_category_id);
    formData.append("course_visible", course_visible);
    formData.append("course_start_date", course_start_date);
    formData.append("course_end_date", course_end_date);
    formData.append("course_image", course_image);
    formData.append("course_desc", course_desc);

    axios
      .post("http://localhost:5000/admin/createcourse", formData)
      .then((res) => {
        if (res.data.message === "Course created successfully") {
          toast.success("Course Created Successfully");
          setCoursename("");
          setCourseShortName("");
          setCourseCategory("");
          setCourseVisibility("Students");
          setCourseStartDate("");
          setCourseEndDate("");
          setCourseImage(null);
          setCourseDescription("");
          document.getElementById("course_image").value = ""; // Clear file input
        } else if (res.data.message === "Error inserting course") {
          toast.error("Error inserting course");
        }
      })
      .catch((error) => {
        toast.error("Error adding course: " + error.message);
      });
  };

  return (
    <div className="frmbg p-5 h-100">
      <form className="bg-light p-5 rounded-5" onSubmit={handleSubmit}>
        <div className="form-group">
          <div className="form-group-inner">
            <label htmlFor="coursename">Course Full Name</label>
            <input
              id="coursename"
              type="text"
              className="form-control"
              value={coursename}
              onChange={(e) => setCoursename(e.target.value)}
            />
          </div>
        </div>
        <div className="form-group">
          <div className="form-group-inner">
            <label htmlFor="course_short_name">Course Short Name</label>
            <input
              id="course_short_name"
              type="text"
              className="form-control"
              value={course_short_name}
              onChange={(e) => setCourseShortName(e.target.value)}
            />
          </div>
        </div>
        <div className="form-group">
          <div className="form-group-inner">
            <label htmlFor="course_category_id">Course Category</label>
            <select
              id="course_category_id"
              className="form-control"
              value={course_category_id}
              onChange={(e) => setCourseCategory(e.target.value)}
            >
              <option value="">Choose Category</option>
              {category.map((e) => (
                <option key={e.course_category_id} value={e.course_category_id}>
                  {e.course_category_name}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="form-group">
          <div className="form-group-inner">
            <label htmlFor="course_visible">Course Visibility</label>
            <select
              id="course_visible"
              className="form-control"
              value={course_visible}
              onChange={(e) => setCourseVisibility(e.target.value)}
            >
              <option value="Students">Students</option>
              <option value="All">All</option>
            </select>
          </div>
        </div>
        <div className="form-group">
          <div className="form-group-inner">
            <label htmlFor="course_start_date">Course Start Date</label>
            <input
              id="course_start_date"
              type="date"
              className="form-control"
              value={course_start_date}
              onChange={(e) => setCourseStartDate(e.target.value)}
            />
          </div>
        </div>
        <div className="form-group">
          <div className="form-group-inner">
            <label htmlFor="course_end_date">Course End Date</label>
            <input
              id="course_end_date"
              type="date"
              className="form-control"
              value={course_end_date}
              onChange={(e) => setCourseEndDate(e.target.value)}
            />
          </div>
        </div>
        <div className="form-group">
          <div className="form-group-inner">
            <label htmlFor="course_image">Course Image</label>
            <input
              id="course_image"
              type="file"
              className="form-control"
              accept=".jpg, .jpeg, .png"
              onChange={(e) => setCourseImage(e.target.files[0])}
            />
          </div>
        </div>
        <div className="form-group">
          <div className="form-group-inner">
            <label htmlFor="course_desc">Course Description</label>
            <textarea
              id="course_desc"
              className="form-control"
              value={course_desc}
              onChange={(e) => setCourseDescription(e.target.value)}
            ></textarea>
          </div>
        </div>
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
}

export default Courseupdation;
