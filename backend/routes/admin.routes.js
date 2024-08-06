import express from 'express'
import { createCourse, createModule, createSubModule, getCourseCategory, getCourses, getModules} from '../controller/admin.controller.js'
import upload from '../middleware/fileUpload.js'
const router = express.Router()

router.get('/getcourses',getCourses)
router.get('/getmodules/:id',getModules)
router.get('/getcetegory',getCourseCategory)
router.post('/createcourse', upload.single('course_image'), createCourse);
router.post('/createmodule',createModule)
router.post('/createsubmodule',createSubModule)

export default router