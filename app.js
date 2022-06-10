const express = require("express");
const methodOverride = require('method-override');
const bodyParser = require('body-parser');
const nodemailer = require("nodemailer");
const app = express();

app.use(bodyParser.json());
app.use(methodOverride('_method'));
//app.use(fileUpload());
app.use(express.urlencoded());
app.use(express.json());
app.use('/public', express.static('public'));

app.use('/media', express.static('media'));
app.set("view engine" , 'ejs');

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth:{
        user:"*SENDER*",
        pass:"*PASSWORD*"
    }
});


app.get("/", (req,res) =>{
    res.redirect("/home")
})


app.get("/home", (req,res) =>{
    
    res.render('main');

})

app.post("/home" , async(req,res)=>{
    const sender = req.body.user.sender;
    const contact = req.body.user.contact;
    const text = req.body.user.text;

    const options =  {
        from:"**",
        to:"**",
        subject:"Reach out Message from Website!!!!",
        text:"Hey," + "E-Mail Sender : " + sender + "\nText : " + text + "\nContact Number : " + contact
    };

    transporter.sendMail(options, function(err,info){
        if(err){
            console.log(err);
            return;
        }
    
        
    })

    res.redirect("/home")
})

app.get("/ourteam", (req,res)=>{
    res.render("team")    
})

app.get("/about-us", (req,res)=>{
    res.render("aboutus")
})

app.get("/whatwedo", (req,res)=>{
    res.render("what")
})

app.get("/ourpartners", (req,res)=>{
    res.render("partners")
})

const port = 8000

app.listen(process.env.PORT || port, () => console.log("server started on port " + port));
