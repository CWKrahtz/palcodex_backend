import express from "express";
import AppDataSource from "../appDatasource";
import { Inventory } from "../entity/inventory";

const inventoryRouter = express.Router()

inventoryRouter.use(express.json())

const appDataSource = AppDataSource;

inventoryRouter.get('/', async (req, res) => {
    try {
        const inventory = await appDataSource.getRepository(Inventory).find()
        res.json(inventory)
    } catch (error) {
        console.error("Error finding maerials")
        res.status(500).json({ error: 'Internal Server Error' })
    }
})