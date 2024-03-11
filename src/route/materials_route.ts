import express from "express";
import AppDataSource from "../appDatasource";
import { Materials } from "../entity/materials";

const materialRouter = express.Router()

materialRouter.use(express.json())

const appDataSource = AppDataSource;

materialRouter.get('/', async (req, res) => {
    try {
        const materials = await appDataSource.getRepository(Materials).find()
        res.json(materials)
    } catch (error) {
        console.error("Error finding maerials")
        res.status(500).json({error: 'Internal Server Error'})
    }
})