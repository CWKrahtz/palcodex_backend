import express from "express";
import AppDataSource from "../appDatasource";
import { AdvanceCraft } from "../entity/advance_craft";

const advanceCraftRoute = express.Router()

advanceCraftRoute.use(express.json())

const appDataSource = AppDataSource;

advanceCraftRoute.get('/', async (req, res) => {
    try {
        const advanceCraft = await appDataSource.getRepository(AdvanceCraft).find()
        res.json(advanceCraft)
    } catch (error) {
        console.error("Error finding novice craft")
        res.status(500).json({ error: 'Internal Server Error' })
    }
})