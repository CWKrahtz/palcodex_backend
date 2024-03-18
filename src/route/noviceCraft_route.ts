import express from "express";
import AppDataSource from "../appDatasource";
import { NoviceCraft } from "../entity/novice_craft";

const noviceCraftRoute = express.Router()

noviceCraftRoute.use(express.json())

const appDataSource = AppDataSource;

noviceCraftRoute.get('/', async (req, res) => {
    try {
        const noviceCraft = await appDataSource.getRepository(NoviceCraft).find()
        res.json(noviceCraft)
    } catch (error) {
        console.error("Error finding novice craft")
        res.status(500).json({ error: 'Internal Server Error' })
    }
})