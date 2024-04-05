import express from "express";
import AppDataSource from "../appDatasource";
import { Materials } from "../entity/materials";
import { Inventory } from "../entity/inventory";

const materialRouter = express.Router()

materialRouter.use(express.json())

const appDataSource = AppDataSource;

materialRouter.get('/', async (req, res) => {
    try {
        const materials = await appDataSource.getRepository(Materials).find()
        res.json(materials)
    } catch (error) {
        console.error("Error finding materials")
        res.status(500).json({ error: 'Internal Server Error' })
    }
})

materialRouter.put("/:id", async (req, res) => {

    try {
        const id = parseInt(req.params.id) // id of item want to update
        const { item, material_id, amount } = req.body // all the values we want to update
        const inventoryItem = await appDataSource.getRepository(Inventory).findOneBy({ profile_id: id, material_name: item})
        const materialItem = await appDataSource.getRepository(Materials).findOneBy({ id: material_id})

        if (!inventoryItem) { // if item doesn't exist respond swith 404
            res.status(404).json({ message: "No Item found" })
        }
        else {
            inventoryItem!.material_amount += amount
            //update all the vars of inventoryItem that you want

            const updatedItem = await appDataSource.getRepository(Inventory).save(inventoryItem!)

            materialItem!.material_amount -= amount;
            await appDataSource.getRepository(Materials).save(materialItem!)

            res.json(updatedItem)
        }



    } catch (error) {
        console.error("Error Update inventory item", error)
        res.status(500).json({ error: "Internal Server Error" })
    }

})

export default materialRouter