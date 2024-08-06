import db from "../config/db.config.js";
import path from "path";

export const createCourse = async (req, res) => {
  try {
    // Extract course data from the request body
    const {
      coursename,
      course_short_name,
      course_category_id,
      course_visible,
      course_start_date,
      course_end_date,
      course_desc,
    } = req.body;

    // Get the uploaded file
    const course_image = req.file
      ? path.join("/uploads", req.file.filename)
      : "default_image.jpg";

    // SQL query to insert a new course into the database
    const query = `
      INSERT INTO courses ( 
        coursename, 
        course_short_name, 
        course_category_id, 
        course_visible, 
        course_start_date, 
        course_end_date, 
        course_image, 
        course_desc
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;

    // Values to be inserted
    const values = [
      coursename,
      course_short_name || "",
      course_category_id || null,
      course_visible || "",
      course_start_date || null,
      course_end_date || null,
      course_image,
      course_desc || "",
    ];

    // Execute the query
    db.query(query, values, (error, results) => {
      if (error) {
        console.error("Error inserting course:", error);
        return res.status(500).json({ message: "Error inserting course" });
      }

      // Send a success response
      res.status(201).json({
        message: "Course created successfully",
        courseId: results.insertId,
      });
    });
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

export const createModule = async (req, res) => {
  const { courseid, modulename } = req.body;

  try {
    // Generate the module_id
    let module_id = "";
    db.query(
      "SELECT MAX(moduleid) AS max_id FROM modules WHERE courseid = ?",
      [courseid],
      (err, results) => {
        if (err) {
          return res
            .status(500)
            .json({ message: "currentlt this course it's not enrolled" });
        }

        // Get max_id and handle it appropriately
        const max_id = results[0].max_id;

        if (max_id) {
          // Extract the numeric part of max_id
          const max_id_parts = max_id.split(".");
          const lastPart = parseInt(max_id_parts[max_id_parts.length - 1], 10);
          const newPart = lastPart + 1;
          module_id = `${courseid}.${newPart}`;
        } else {
          // If no max_id found, start with `courseid.1`
          module_id = `${courseid}.1`;
        }

        // Insert new module
        let sql =
          "INSERT INTO modules (moduleid, courseid, modulename) VALUES (?, ?, ?)";
        db.query(sql, [module_id, courseid, modulename], (err, result) => {
          if (err) {
            console.log(err);
            return res.status(500).json({ message: "Module is not inserted" });
          } else {
            res.status(200).json({
              message: "Module added successfully",
              id: result.insertId,
            });
          }
        });
      }
    );
  } catch (e) {
    res.json({ message: "server issue" });
  }
};

export const createSubModule = (req, res) => {
  const { courseid, moduleid, submodulename } = req.body;

  // Generate the submodule_id
  let submodule_id = "";
  db.query(
    "SELECT MAX(submoduleid) AS max_id FROM submodules WHERE moduleid = ?",
    [moduleid],
    (err, results) => {
      if (err) {
        return res.status(500).json({ message: "Database query error" });
      }

      const max_id = results[0].max_id;

      if (max_id) {
        // Extract the numeric part of max_id
        const max_id_parts = max_id.split(".");
        const lastPart = parseInt(max_id_parts[max_id_parts.length - 1], 10);
        const newPart = lastPart + 1;
        submodule_id = `${moduleid}.${newPart}`;
      } else {
        // If no max_id found, start with `moduleid.1`
        submodule_id = `${moduleid}.1`;
      }

      // Insert new submodule
      let sql =
        "INSERT INTO submodules (submoduleid, courseid, moduleid, submodulename) VALUES (?, ?, ?, ?)";
      db.query(
        sql,
        [submodule_id, courseid, moduleid, submodulename],
        (err, result) => {
          if (err) {
            return res
              .status(500)
              .json({ message: "submodule it's not inserted" });
          }
          res.json({
            message: "Submodule Added Successfully",
            id: result.insertId,
          });
        }
      );
    }
  );
};

export const getCourses = async (req, res) => {
  const baseurl = "http://localhost:5000";

  let sql = `
  SELECT 
  c.courseid,
  c.coursename, 
  c.course_short_name, 
  c.course_category_id, 
  c.course_visible, 
  c.course_start_date, 
  c.course_end_date, 
  CONCAT('${baseurl}', c.course_image) as course_image,
  c.course_desc,
  cc.course_category_name  -- Selecting the course_category_name
FROM courses c
JOIN course_category cc ON c.course_category_id = cc.course_category_id
  `;

  db.query(sql, (err, results) => {
    if (err) throw err;
    res.json({ results: results });
  });
};

export const getModules = async (req, res) => {
  const { id } = req.params;

  let sql = "SELECT * FROM modules WHERE courseid = ?";
  db.query(sql, [id], (err, result) => {
    if (err) {
      res.json({ error: err });
    } else {
      console.log(result);
      res.json({ result: result });
    }
  });
};

export const getCourseCategory = async (req, res) => {
  const sql = `select * from course_category`;

  db.query(sql, (err, result) => {
    if (err) {
      res.json({ error: err });
    } else {
      res.status(200).json({ result: result });
    }
  });
};
