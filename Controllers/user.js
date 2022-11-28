const User = require('../Models/user');
const mongoose = require('mongoose');

exports.createUser = (async(req, res, next) => {
    try{
        const newUser = new User({...req.body});

        newUser.save().then(() => {
        console.log(newUser);
        //res.send('New User created successfully!');
        //res.json(newUser);
        res.json({
            message: 'New User created successfully!',
            user: newUser
        });    
        }).catch((err) => {
            res.status(500).send('Internal Server Error!');
            next();
        })
    }
    catch(error){
        console.log(error);
        res.status(500).send('Internal Server Error2!')
        next();
    }
});

// Créer un utilisateur

exports.getUsers = (async(req, res, next) => {
    try{
        User.find().then((users) => {
            if (users) {
                return res.json(users)
            } else {
                return res.status(404).send('User not found');
            }
        }).catch((err) => {
            console.log(err);
            res.status(500).send('Internal Server Error!');
            next();
        });
    }
    catch(error){
        console.log(error);
        res.status(500).send('Internal Server Error2!')
        next();
    }
});

// Obtenir des utilisateurs

exports.getUsers = (async(req, res, next) => {
    try{
        const id = req.params.id;
        if(!id){
            return res.status(400).send('id required');
        }
        User.findById(id).then((user) =>  {
            if (user) {
                console.log(user)
                return res.json(user)
            } else {
                res.status(404).send('User not found');
            }
        }).catch((err) => {
            console.log(err)
            res.status(500).send('Internal Server Error1!');
            next();
        });
    } catch(error) {
        console.log(error);
        res.status(500).send('Internal Server Error2!')
        next();
    }
});

// Obtenir l'utilisateur par identifiant

exports.deleteUser = (async(req, res, next) => {
    try{
        const id = req.params.id;
        if(!id){
            return res.status(400).send('id required');
        }
        User.findByIdAndRemove(id).then((user) => {
            if (user) {
                console.log(user)
                //return res.json('user Account deleted Successfully!')
                res.json({
                    message: 'user Account deleted Successfully',
                    user : user
                });
            } else {
                return res.status(404).send('user account Not found!');
            }
        }).catch((err) => {
            console.log(err);
            res.status(500).send('Internal Server Error1!')
            next();
        });
    }
    catch(error) {
        console.log(error);
        res.status(500).send('Internal Server Error2!')
        next();
    }
});

// Supprimer un utilisateur par identifiant

exports.updateUser = (async(req, res, next) => {
    try{
        const id = req.params.id;
        if(!id) {
            return res.status(400).send('id required');
        }
        User.findByIdAndUpdate(
            id,
            {$set: {
                'email': req.body.email,
                'password': req.body.password,
                'profilePic': req.body.profilePic,
                'age': req.body.age,
                'contactNumber': req.body.contactNumber,
                'address': req.body.address,
                'firstName': req.body.firstName,
                'lastName': req.body.lastName
            }},
            {new: true},
            function(err, user) {
                if(err) {
                    console.log(err)
                    res.json({error :err});
                    next();
                } else {
                    console.log(user);
                    res.json({
                        message: 'user Account updated Successfully!',
                        user : user
                    });
                    next();
                }
            });
        
    }
    catch(error) {
        console.log(error);
        res.status(500).send('Internal Server Error2!')
        next();
    }
});