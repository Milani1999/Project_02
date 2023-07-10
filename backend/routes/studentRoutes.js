const express=require ('express');
const { getStudents, createStudents }=require("../controllers/studentController");

const router=express.Router();

router.route('/').get(getStudents);
router.route('/create').post(createStudents);
// router.route('/:id').get().put().delete();

module.exports=router;