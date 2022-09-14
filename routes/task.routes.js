const Task = require("../controllers/tasks.controller")
const router = require("express").Router()



router.get("/" , Task.index)
router.get("/add" , Task.add)
router.get("/getAddLogic", Task.addLogic) 
router.post("/addPost" , Task.addPostMethod)
router.get("/single/:id" , Task.single)
router.get("/edit/:id" , Task.edit)
router.post("/edit/:id" , Task.editPostMethod)
router.get("/delete/:id" , Task.delete)



module.exports = router