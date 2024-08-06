import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./Modulepage.module.css"; // Import CSS module
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'; // Ensure to include Toastify CSS

function Modulepage() {
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState("");
  const [textareas, setTextareas] = useState([""]);

  useEffect(() => {
    // Fetch courses from the backend
    axios
      .get("http://localhost:5000/admin/getcourses")
      .then((response) => {
        setCourses(response.data.results);
      })
      .catch((error) => {
        console.error("There was an error fetching the courses!", error);
      });
  }, []);

  const addTextarea = () => {
    setTextareas([...textareas, ""]);
  };

  const handleTextareaChange = (index, value) => {
    const newTextareas = [...textareas];
    newTextareas[index] = value;
    setTextareas(newTextareas);
  };

  const handleCourseChange = (e) => {
    setSelectedCourse(e.target.value);
  };

  const handleSaveModule = (event) => {
    event.preventDefault(); // Prevent the default form submission
    textareas.forEach((textarea) => {
      if (textarea.trim() !== "" && selectedCourse !== "") {
        axios
          .post("http://localhost:5000/admin/createmodule", {
            courseid: selectedCourse,
            modulename: textarea,
          })
          .then((response) => {
            if (response.data.message === "Module is not inserted") {
              toast.error("Module is not inserted");
            } else if (response.data.message === "Module added successfully") {
              setTextareas([""]);
              setSelectedCourse("");
              toast.success("Module added successfully");
            } else if (
              response.data.message ===
              "currently this course it's not enrolled"
            ) {
              toast.error("Currently this is not available to Enroll.");
            } else if (response.data.message === "server issue") {
              toast.error("Server issue");
            }
          })
          .catch((error) => {
            toast.error("There was an error saving the module!");
          });
      }
    });
  };

  return (
    <div className={styles.containerFluid}>
      <form onSubmit={handleSaveModule} className={styles.formControl}>
        <div className="d-flex flex-column align-items-start mb-3">
          <h4 className="mb-3">Course Module</h4>

          <div className={styles.selectContainer}>
            <select
              onChange={handleCourseChange}
              value={selectedCourse}
              className={styles.customSelect}
              required
            >
              <option value="">Select the Course</option>
              {courses.map((course) => (
                <option key={course.courseid} value={course.courseid}>
                  {course.coursename}
                </option>
              ))}
            </select>
          </div>
        </div>

        {textareas.map((textarea, index) => (
          <div key={index} className="d-flex align-items-start my-2">
            <textarea
              className={styles.textarea}
              value={textarea}
              onChange={(e) => handleTextareaChange(index, e.target.value)}
              rows="3"
              placeholder="Enter module name"
            />
            <button
              type="button"
              className={styles.addButton}
              onClick={addTextarea}
            >
              <i className="bi bi-plus-lg"></i>
            </button>
          </div>
        ))}

        <div className="d-flex justify-content-center mt-3">
          <button type="submit" className={styles.submitButton}>
            Submit
          </button>
        </div>
      </form>
      <div>
        <ToastContainer />
      </div>
    </div>
  );
}

export default Modulepage;
