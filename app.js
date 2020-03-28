const express = require('express');
const app = express();
const port = 3000;
const { projects } = require('./data/data.json');


app.set('view engine', 'pug');
app.use('/static', express.static('public'));

//Index Route
app.get('/', (req,res) => {
    res.render("index", { projects });
});

//About Route
app.get('/about', (req,res) => {
    res.render("about");
});

//Specific Project Route
app.get('/project/:id', (req,res,next) =>{
    const projectId = req.params.id;
    const project = projects.find( ({id}) => id === +projectId);
    if(project){
        res.render("project", {project});
    }else{
        next();
    }
});

//Error Handling
app.use((req, res, next) => {
    const err = new Error("Not Found");
    err.status = 404;
    next(err);
})

//Renders error page
app.use((err, req, res, next) => {
    res.locals.error = err;
    res.status(err.status);
    res.render("error");
});

app.listen(port, () => {
    console.log('Server has been started');
})