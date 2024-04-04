import express from "express";
import AppDataSource from "../appDatasource";
import { Inventory } from "../entity/inventory";

const inventoryRouter = express.Router()

inventoryRouter.use(express.json())

const appDataSource = AppDataSource;

inventoryRouter.get('/:id', async (req, res) => {
    try {
        var id = parseInt(req.params.id);
        const inventory = await appDataSource.getRepository(Inventory).createQueryBuilder("inventory")
        .where("inventory.profile_id = :id", { id: id})
        .getRawMany()

        res.json(inventory)
    } catch (error) {
        console.error("Error finding maerials")
        res.status(500).json({ error: 'Internal Server Error' })
    }
})