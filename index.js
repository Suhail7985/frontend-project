const express = require('express');
const collection=require("mongodb");
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


// // Serve static files from the public directory
app.use('/css', express.static(__dirname + '/css'));
app.use('/picture', express.static(__dirname + '/picture'));
// app.use('/js', express.static(__dirname + '/js'));
// app.use('/lib', express.static(__dirname + '/lib'));
// app.use('/scss', express.static(__dirname + '/scss'));
app.use('/public', express.static(__dirname + '/public'));


//login
app.post("/signup",async (req,res)=>{
    const data={
        username:req.body.username,
        password:req.body.password
    }

    // await collection.insert([data]) 
    try{
        await collection.insertMany([data]);
        res.sendFile(path.join(__dirname,'indexx.html'));
        console.log("data Added");
    } catch(error){
        console.error("error inserting data:",error);
        res.status(500).send (`${error.message}`)
    }

    // res.render("home")
})

// Route for the index page

app.post("/login",async (req,res)=>{
    try{
    const check=await collection.findOne({username:req.body.username})

    if(check.password===req.body.password){
        res.render("home")
    }else{
        res.send("Wrong Password")
    }

    }
    catch{
        res.send("Wrong Details")
    }
})


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'indexx.html'));
});

// // Route for page1
// app.get('/about', (req, res) => {
//     res.sendFile(path.join(__dirname, 'public','about.html'));
// });

// // Route for page2
// app.get('/blog', (req, res) => {
//     res.sendFile(path.join(__dirname, 'public','blog.html'));
// });

// app.get('/class', (req, res) => {
//     res.sendFile(path.join(__dirname, 'public','class.html'));
// });
// app.get('/contact', (req, res) => {
//     res.sendFile(path.join(__dirname, 'public','contact.html'));
// });
// app.get('/detail', (req, res) => {
//     res.sendFile(path.join(__dirname, 'public','detail.html'));
// });

// app.get('/team', (req, res) => {
//     res.sendFile(path.join(__dirname, 'public','team.html'));
// });
// app.get('/testimonial', (req, res) => {
//     res.sendFile(path.join(__dirname, 'public','testimonial.html'));
// });

// app.post("/contact1",async (req,res)=>{
//     const data={
//         name:req.body.name1,
//         email:req.body.email,
//         subject:req.body.subject,
//         message:req.body.message,
//     }
//     try {
//         await collection.insertMany([data]);
//         res.sendFile(path.join(__dirname,'public', 'contact.html'));
//         console.log("Data Added");

//     } catch (error) {
//         console.error("Error inserting data:", error);
//         res.status(500).send(`Error occurred while saving contact information: ${error.message}`);
//     }
// })


// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});















