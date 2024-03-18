import express from "express";
import AppDataSource from "../appDatasource";
import { VeteranCraft } from "../entity/veteran_craft";

const veteranCraftRoute = express.Router()

veteranCraftRoute.use(express.json())

const appDataSource = AppDataSource;

veteranCraftRoute.get('/', async (req, res) => {
    try {
        const vetreanCraft = await appDataSource.getRepository(VeteranCraft).find()
        res.json(vetreanCraft)
    } catch (error) {
        console.error("Error finding novice craft")
        res.status(500).json({ error: 'Internal Server Error' })
    }
})