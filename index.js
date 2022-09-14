const express = require("express")
const hbs = require("hbs")
const path = require("path")
const { json } = require("body-parser")

const PORT = 3000
const app = express()

const public = path.join(__dirname , "frontend/public")
const layouts = path.join(__dirname , "frontend/layouts")
const views = path.join(__dirname , "frontend/views")


app.use(express.static(public))
app.set("view engine" , 'hbs')
app.set("views" , views)
hbs.registerPartials(layouts)
// app.use(express.urlencoded({extended:true}))


const taskRoutes = require("./routes/task.routes")
app.use(taskRoutes)

app.get("*" , (req ,res) =>{
    res.render("error404" , {
        pageTitle:"Page not found"
    })
})
app.listen(PORT , () => console.log(`http://localhost:${PORT}`) )