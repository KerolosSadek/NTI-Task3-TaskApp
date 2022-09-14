const fs = require("fs")

class Task {
    static index = (req,res)=>{
        let allTasks 
        try{
            allTasks = JSON.parse(fs.readFileSync('data.json'))||[]
        }
        catch(e){
            allTasks = []
        }
        allTasks.forEach(task=> task.status=="Active"? task.status=true: task.status=false)
        res.render("home" , {
            pageTitle:"Home Page",
            allTasks,
            noTasks : allTasks.length ==0? true : false,
        })
    }
    static add = (req , res)=>{
        res.render("add" , {
            pageTitle:"Add Page"
        })
    }
    static addLogic = (req , res)=>{
        const task = { id:Date.now(), ...req.query }
        let allTasks 
        try{
            allTasks = JSON.parse(fs.readFileSync('data.json')) || []
        }
        catch(e){
            allTasks = []
        }
        allTasks.push(task)
        fs.writeFileSync("data.json", JSON.stringify(allTasks))
        res.redirect('/')
    }
    static addPostMethod = (req , res)=>{
        const task = {id: Date.now() , ...req.body}
        let allTasks = []
        try{
            allTasks = JSON.parse(fs.readFileSync('data.json')) || []
        }
        catch(e) {
            allTasks = []
        }
        allTasks.push(task)
        fs.writeFileSync("data.json" , JSON.stringify(allTasks))
        res.redirect('/')
    }
    static single = (req , res)=>{
        let allTasks 
        try{
            allTasks = JSON.parse(fs.readFileSync('data.json')) || []
        }
        catch(e){
            allTasks = []
        }
        let task = allTasks.find(task => task.id == req.params.id)
        res.render("single", {
            pageTitle: "single user",
            task
        })
    } 
    static edit =(req , res)=>{
        let allTasks 
        try{
            allTasks = JSON.parse(fs.readFileSync('data.json'))||[]
        }
        catch(e){
            allTasks = []
        }
        let task = allTasks.find(task => task.id == req.params.id)
        res.render("edit" , {
            pageTitle:"Edit Page",
            task
        })
    }
    static editPostMethod = (req , res)=>{
        let allTasks 
        try{
            allTasks = JSON.parse(fs.readFileSync('data.json')) || []
        }
        catch(e){
            allTasks = []
        }
        let task = allTasks.findIndex(task => task.id == req.params.id)
        allTasks[task] = { id:req.params.id , ...req.body }
        fs.writeFileSync("data.json", JSON.stringify(allTasks))
        res.redirect("/")
    }
    static delete = (req , res)=>{
        let allTasks 
        try{
            allTasks = JSON.parse(fs.readFileSync("data.json")) || []
            let taskId = allTasks.findIndex(task => task.id == req.params.id)
            if(taskId!=-1) {
                allTasks.splice(taskId, 1)
                fs.writeFileSync("data.json", JSON.stringify(allTasks))
            }    
        }
        catch(e){
            allTasks = []
        }
        res.redirect('/')
    }
}
module.exports = Task