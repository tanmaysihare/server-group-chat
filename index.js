require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3001;
const db = require('./models');


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended:false }));

const userRouter = require('./routes/User');
app.use('/users', userRouter);
const messagesRouter = require('./routes/Messages');
app.use('/messages', messagesRouter);

db.sequelize.sync().then(()=>{
    app.listen(port, () => {
        console.log(`Server is running on port ${port}.`);
    });
});
