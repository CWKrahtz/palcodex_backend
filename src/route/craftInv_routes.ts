import express from "express";
import AppDataSource from "../appDatasource";
import { CraftInv } from "../entity/craft_inv";

const craftInvRoute = express.Router()

craftInvRoute.use(express.json())

const appDataSource = AppDataSource;

craftInvRoute.get('/', async (req, res) => {
    try {
        const craftInv = await appDataSource.getRepository(CraftInv).find()
        res.json(craftInv)
    } catch (error) {
        console.error("Error finding maerials")
        res.status(500).json({ error: 'Internal Server Error' })
    }
})