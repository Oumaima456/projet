const express =require('express');

const mongoose =require ('mongoose');
const config =require ('./config');
const userRoute =require ('./routes/userRoute');
const hopitalRoute =require ('./routes/hopitalRoute');
const reservationRoute =require ('./routes/reservationRoute');

const mongodbUrl = config.MONGODB_URL;
mongoose.connect(mongodbUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
}).then(console.log('database runing ...'))
.catch((error) => console.log(error.reason));


const app = express();
app.use(express.json());

app.use('/api/users', userRoute);
app.use('/api/hopitals', hopitalRoute);
app.use('/api/reservation', reservationRoute);




app.listen(config.PORT, () => { console.log('Server started at http://localhost:4000'); });
