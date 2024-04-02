import express from "express";
import AppDataSource from "../appDatasource";
import { User } from "../entity/user";
import * as bcrypt from 'bcrypt'

const userRouter = express.Router()

userRouter.use(express.json())

const appDataSource = AppDataSource;

//Create post endpoint to create our users -> not for adding new users but to enable adding to our database (enable syncronize)
userRouter.post("/", async (req, res) =>{

    try {

        const {username, email, password, status, isAdmin} = req.body
        
        var newUser = new User()

        newUser.username = username
        newUser.email = email
        newUser.password = password //hashing
        newUser.status = status
        newUser.isAdmin = isAdmin
        
        var addedUser = await appDataSource.getRepository(User).save(newUser);

        return res.json(addedUser)
        
    } catch (error) {
        console.error("Error occured" + error)
        res.status(500).json({ error: 'Internal Server Error' })
    }
})

//create a post endpoint, for login
userRouter.post('/login', async (req, res) => {

    try {
        //get email && password from the http request
        const { email, password } = req.body

        if(email && password){
            let userRequest = await appDataSource.getRepository(User).findOneBy({email: email});

            if(!userRequest) {
                return res.status(404).json({message: "No User Found" });
            } else {

                //check that password matches
                bcrypt.compare(password, userRequest.password, (error, result) => {
                    //result == true, password match
                    if(result) {
                        userRequest!.password = "" //to hide/not expose the password
                        return res.json(userRequest);// send the user data if logged in succes
                    } else {
                        return res.status(500).json({ message: 'Invalid Credentials' });
                    }
                })

            }
        }

    } catch (error) {
        console.error("Error occured" + error)
        res.status(500).json({ message: error })
    }
})

export default userRouter