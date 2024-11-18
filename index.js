const express = require('express')
const bodyParser = require('body-parser');
const accounts = require('./data.json');
 

  
//const rateLimit = require('express-rate-limit')
require('dotenv').config()
//const errorHandler = require('./middleware/error')
const path = require('path')

const PORT = process.env.PORT || 5000

const app = express()
app.use(express.json())


app.set("views", __dirname + "/views");
app.set('view engine', 'ejs');



// Set static folder
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public')));

app.post('/login', async (req, res) => {
    try{
        const foundUser = accounts.find((data) => req.body.Password === data.pine);
        if (foundUser) {
                res.render('result',{Name:foundUser.Aname.Name,Mname:foundUser.Aname.Mname,Surname:foundUser.Aname.Surname,NIN:foundUser.NIN,Gender:foundUser.Gender,Day:foundUser.Ddateofbirth.Day,Month:foundUser.Ddateofbirth.Month,Year:foundUser.Ddateofbirth.Year,Presentclass:foundUser.Presentclass,Bloodgroup:foundUser.Bloodgroup,State:foundUser.State,School:foundUser.School,HometownCommunity:foundUser.HometownCommunity,ParentPhoneNo:foundUser.ParentPhoneNo,ParentPhoneNo2:foundUser.ParentPhoneNo2,Picturepath:foundUser.client,Status:foundUser.Status});
                //res.send(`<div align ='center'><h2>login successful</h2></div><br><br><br><div align ='center'><h3>Hello </h3></div><br><br><div align='center'><a href='./lohtml'>logout</a></div>`);
            } else {
            res.send("<div align ='center'><h2>Invalid email or password</h2></div><br><br><div align ='center'><a href='./login.html'>login again</a></div>");
            }
        //}
       
    } catch{
        res.send("Internal server error");
        
    }
});


app.listen(PORT, () => console.log(`Server running on port ${PORT}`))

module.exports = app;
