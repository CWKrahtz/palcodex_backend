import express from "express";
import AppDataSource from "../appDatasource";
import { CraftInv } from "../entity/craft_inv";
import { Inventory } from "../entity/inventory";

const craftInvRoute = express.Router()

craftInvRoute.use(express.json())

const appDataSource = AppDataSource;

// craftInvRoute.get('/', async (req, res) => {
//     try {
//         const craftInv = await appDataSource.getRepository(CraftInv).find()
//         res.json(craftInv)
//     } catch (error) {
//         console.error("Error finding maerials")
//         res.status(500).json({ error: 'Internal Server Error' })
//     }
// })


craftInvRoute.post('/craftRecipe', async (req, res) => {
    try {
        const { recipe, inventory } = req.body;

        if (!recipe || !Array.isArray(inventory) || inventory.length === 0) {
            return res.status(400).json({ error: 'Invalid request body' });
        }

        const craftThis = new CraftInv();
        craftThis.craft_amount = 1;
        craftThis.profile_id = inventory[0].profile_id;
        craftThis.craft_name = recipe;

        const savedCraftInv = await appDataSource.getRepository(CraftInv).save(craftThis);

        console.log("Crafted inventory added successfully");
        return res.status(201).json(savedCraftInv);
    } catch (error) {
        console.error("Error Crafting Recipes:", error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})

export default craftInvRoute;