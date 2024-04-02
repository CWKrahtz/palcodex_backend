import express from "express";
import AppDataSource from "../appDatasource";
import { Profiles } from "../entity/user";

const profileRoute = express.Router()

profileRoute.use(express.json())

const appDataSource = AppDataSource;

profileRoute.get('/', async (req, res) => {
    try {
        const profiles = await appDataSource.getRepository(Profiles).find()
        res.json(profiles)
    } catch (error) {
        console.error("Error finding profiles")
        res.status(500).json({ error: 'Internal Server Error' })
    }
})