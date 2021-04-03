const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();
const Post = require('./models/Post');


//middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));


//import routes
const postRoute = require('./routes/posts');

app.use('/posts',postRoute);

//routes
app.get('/',(req, res) => {
    res.send("We are on!");
});



//connect to DB
mongoose.connect(
    process.env.DB_CONNECTION,
    { useNewUrlParser: true,useUnifiedTopology: true }, 
    () => console.log("Connected to db")
);


//listen to the server
app.listen(3000);

//sheets api
const { google } = require("googleapis");
const keys = require('./keys.json')

const client = new google.auth.JWT(
    keys.client_email, 
    null, 
    keys.private_key,
    ['https://www.googleapis.com/auth/spreadsheets'] 
);

client.authorize(function(err, tokens) {
    if(err){
        console.log(err);
        return;
    } else {
        console.log('connected to google API');
        gsrun(client);
    }
});

var s;

async function gsrun(cl){
    const gsapi = google.sheets({version:'v4', auth:cl});

    const opt = {
        spreadsheetId: '1Y0b8HYrWcHNLIo08y3lp4KU-ePt2X-Vh7l6J2ex1bYo',
        range:'table'
    }

    let data1 = await gsapi.spreadsheets.values.get(opt);

    const act_data = data1.data.values;

    s = act_data;
    console.log(s[5][3]);
}

app.post('/posts1', async (req, res) => {

    for(var i=2;i<s.length;i++)
    {

        if(s[i][0]=='')
        {
            for(var j=0;j<=9;j++)
            {
                s[i][j] = (s[i][j] == "") ? s[i-1][j] : s[i][j];
            }
        }

        const post = new Post({
            Code: s[i][0],
            Sex: s[i][1],
            Age: s[i][2],
            BodyWeight: s[i][3],
            BrainWeight: s[i][4],
            Parts: s[i][5],
            Staining: s[i][6],
            SectionThickness: s[i][7],
            PlaneOfSectioning: s[i][8],
            Distance: s[i][9],
        });
        try{
            const savedPost = await post.save();
            // res.json(savedPost);    
        }catch(err) {
            res.json({message: err})
        }

    }
    res.redirect('/posts');
})