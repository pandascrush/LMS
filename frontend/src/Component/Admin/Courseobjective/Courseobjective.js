import React, { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from "./Courseobjective.module.css"; // Import CSS module

function Courseobjective() {
  const [modules, setModules] = useState([]);
  const [textareas, setTextareas] = useState([""]);
  const [selectedModule, setSelectedModule] = useState("");
  const [selectedCourse, setSelectedCourse] = useState(""); // Add state for selected course
  const [courses, setCourses] = useState([]);

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

  useEffect(() => {
    if (selectedCourse) {
      // Fetch modules based on selected course
      axios
        .get(`http://localhost:5000/admin/getmodules/${selectedCourse}`)
        .then((res) => {
          setModules(res.data.result); // Update state with fetched modules
        })
        .catch((error) => {
          console.error("There was an error fetching the modules!", error);
        });
    }
  }, [selectedCourse]);

  const addTextarea = () => {
    setTextareas([...textareas, ""]);
  };

  const handleTextareaChange = (index, value) => {
    const newTextareas = [...textareas];
    newTextareas[index] = value;
    setTextareas(newTextareas);
  };

  const handleModuleChange = (e) => {
    setSelectedModule(e.target.value);
  };

  const handleCourseChange = (e) => {
    setSelectedCourse(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Assume only the first textarea value is the submodule name for simplicity
    const submodulename = textareas[0];

    axios
      .post("http://localhost:5000/admin/createsubmodule", {
        courseid: selectedCourse,
        moduleid: selectedModule,
        submodulename: submodulename,
      })
      .then((res) => {
        if (res.data.message === "Database query error") {
          toast.error("Database query error");
        } else if (res.data.message === "submodule it's not inserted") {
          toast.error("submodule it's not inserted");
        } else if (res.data.message === "Submodule Added Successfully") {
          toast.success("Submodule Added Successfully");
        }
      })
      .catch((error) => {
        console.error("There was an error creating the submodule!", error);
      });
  };

  return (
    <div className={styles.containerFluid}>
      <form onSubmit={handleSubmit} className={styles.formControl}>
        <div className={styles.header}>
          <h4>Course Objective</h4>
          <div className={styles.selectContainer}>
            <select
              value={selectedCourse}
              onChange={handleCourseChange}
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
          <div className={styles.selectContainer}>
            <select
              value={selectedModule}
              onChange={handleModuleChange}
              className={styles.customSelect}
              required
            >
              <option value="">Select the Course Module</option>
              {modules.length > 0 ? (
                modules.map((module) => (
                  <option key={module.moduleid} value={module.moduleid}>
                    {module.modulename}
                  </option>
                ))
              ) : (
                <option value="">No modules available</option>
              )}
            </select>
          </div>
        </div>
        {textareas.map((textarea, index) => (
          <div key={index} className={styles.textareaContainer}>
            <textarea
              className={styles.textarea}
              value={textarea}
              onChange={(e) => handleTextareaChange(index, e.target.value)}
              rows="3"
              placeholder="Enter submodule name"
              required
            />
            <button
              type="button"
              className={styles.addButton}
              onClick={addTextarea}
            >
              +
            </button>
          </div>
        ))}
        <div className={styles.submitContainer}>
          <button type="submit" className={styles.submitButton}>
            Submit
          </button>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
}

export default Courseobjective;
