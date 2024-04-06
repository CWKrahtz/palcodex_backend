import express from "express";
import AppDataSource from "../appDatasource";
import { Recipes } from "../entity/recipe";
import { CraftInv } from "../entity/craft_inv";

const recipesRoute = express.Router()

recipesRoute.use(express.json())

const appDataSource = AppDataSource;

recipesRoute.get('/', async (req, res) => {
    try {
        const craftInv = await appDataSource.getRepository(Recipes).find()
        res.json(recipesRoute)
    } catch (error) {
        console.error("Error finding maerials")
        res.status(500).json({ error: 'Internal Server Error' })
    }
})

recipesRoute.put("/:id", async (req, res) => {

    try {
        const id = parseInt(req.params.id) // id of item want to update
        const { item, material_id, amount } = req.body // all the values we want to update
        const craftItem = await appDataSource.getRepository(Recipes).findOneBy({ profile_id: id, material_name: item})
        const recipeItem = await appDataSource.getRepository(CraftInv).findOneBy({ id: material_id})

        if (!recipeItem) { // if item doesn't exist respond swith 404
            res.status(404).json({ message: "No Item found" })
        }
        else {
            recipeItem!.craft_amount+= amount
            //update all the vars of inventoryItem that you want

            const updatedItem = await appDataSource.getRepository(Recipes).save(recipeItem!)

            recipeItem!.craft_amount -= amount;
            await appDataSource.getRepository(CraftInv).save(craftItem!)

            res.json(updatedItem)
        }



    } catch (error) {
        console.error("Error Update inventory item", error)
        res.status(500).json({ error: "Internal Server Error" })
    }

})
    
    export default recipesRoute