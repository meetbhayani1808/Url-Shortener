const express = require('express');
const cookieParser = require('cookie-parser')
const urlrouter = require('./router/urlRouter');
const userrouter = require('./router/userRouter');
const staticRouter = require('./router/staticRouter.js');
const Url = require('./models/url.js');
const {auth, checkAuth} = require('./middleware/auth.js')
const ejs = require('ejs');
const path = require('path');
require('./db/mongoose.js');


const app = express();
const PORT = process.env.PORT || 3000;


app.use(express.json());
app.use(express.urlencoded({ extended: false}))
app.use(cookieParser()); 

app.use("/url",auth,urlrouter); 
app.use("/",checkAuth,staticRouter); 
app.use("/user",userrouter);

app.set('view engine','ejs');
app.set('views', path.join(__dirname, "views"));

app.get('/url/:shortId', async (req, res) => {
    const shortId = req.params.shortId;

    console.log(`🚀 ~ app.get ~ shortId:`, shortId)

    const entry = await Url.findOneAndUpdate({
      shortId
    }, {$push: {
      visitHistory: {
        timestamp: Date.now()
      },
    },
  },);
  res.redirect(entry.redirectUrl)
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });