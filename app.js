const express = require('express');

const app = express();

const bcrypt = require('bcrypt');


// const posts = [
//     {
//         author: "temi",
//         title: "post one"
//     },
//     {
//         author: "dayo",
//         title: "post 2"
//     }
// ]

// app.get('/posts', (req, res) => {
//     res.json(posts);
// });


app.use(express.json());

const users = [];

app.get('/users', (req, res) => {
    res.json(users);
});

app.post('/users/add', async (req, res) => {
    try {
        // const salt = await bcrypt.genSalt()
        const hashedPassword = await bcrypt.hash(req.body.password, 10)

        // console.log(salt);
        // console.log(hashedPassword);

        const user = {
            name: req.body.name,
            password: hashedPassword
        }
        users.push(user)
        res.status(201).send()
    } catch (error) {
        res.status(500).send()
    }
    
});

app.post('/users/login', async (req, res) => {
    const user  = users.find(user => req.body.name)
    if (user == null) {
        return res.status(400).send('Cannot find user')
    } 
    try {
       if (await bcrypt.compare(req.body.password, user.password)) {
           res.send('Logged in Successfully!!')
       } else {
          return res.status(401).send('Error: Invalid credentials')
       }
    } catch (error) {
        res.status(500).send()
    }
})

app.listen(4000);