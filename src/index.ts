import express from "express";
import dotenv from "dotenv";
import { DataSource } from "typeorm";
import { Materials } from "./entity/materials";
import AppDataSource from "./appDatasource";
import { Inventory } from "./entity/inventory";
import { User } from "./entity/user";
import { NoviceCraft } from "./entity/novice_craft";
import { AdvanceCraft } from "./entity/advance_craft";
import { VeteranCraft } from "./entity/veteran_craft";
import { CraftInv } from "./entity/craft_inv";
import userRouter from "./route/user_routes";
import { Recipes } from "./entity/recipe";
import inventoryRouter from "./route/inventory_route";
import materialRouter from "./route/materials_route";
import craftInvRoute from "./route/craftInv_routes";

const cors = require("cors");

const app = express();
app.use(cors());
app.use('/users', userRouter)
app.use('/material', materialRouter)
app.use('/craft', craftInvRoute)

dotenv.config();

const appDataSource = AppDataSource

// app.get('/', (req, res) => {
//     res.send('Hello, Devs!');
// })

////MATERIALS////

app.get('/materials', async (req, res) => { //add async
    const materials = await appDataSource //add await
    .manager.find(Materials)

    //find = get
    //use the managing capabilities to find all my material items.

    console.log(materials)
    res.send(materials)
})

app.get('/materials/:id', async (req, res) => {

    var id = parseInt(req.params.id);

    //appDataSource = connection to the DB
    //getRepository = specify the entity we want to connect to
    //gets = finfBy/findOneBy

    const materials = await appDataSource.getRepository(Materials)
    .findOneBy({id: id}) // findOneBy == single where and return 1

    console.log(materials)
    res.send(materials)
})

////INVENTORY////

app.get('/inventory', async (req, res) => { //add async
    const userInv = await appDataSource //add await
    .manager.find(Inventory)

    console.log(userInv)
    res.send(userInv)
})

app.get('/inventory/:id', async (req, res) => {

    var id = parseInt(req.params.id);

    const userInv = await appDataSource.getRepository(Inventory)
    .findOneBy({id: id}) // findOneBy == single where and return 1

    console.log(userInv)
    res.send(userInv)
})

////PROFILES////

app.get('/profiles', async (req, res) => { //add async
    const profile = await appDataSource //add await
    .manager.find(User)

    console.log(profile)
    res.send(profile)
})

app.get('/profiles/:id', async (req, res) => {

    var id = parseInt(req.params.id);

    const profile = await appDataSource.getRepository(User)
    .findOneBy({id: id}) // findOneBy == single where and return 1

    console.log(profile)
    res.send(profile)
})

////NOVICE_CRAFT////

app.get('/novicecraft', async (req, res) => { //add async
    const noviceCraft = await appDataSource //add await
    .manager.find(NoviceCraft)

    console.log(noviceCraft)
    res.send(noviceCraft)
})

////ADVANCE_CRAFT////

app.get('/advancecraft', async (req, res) => { //add async
    const advanceCraft = await appDataSource //add await
    .manager.find(AdvanceCraft)

    console.log(advanceCraft)
    res.send(advanceCraft)
})

////VETERAN_CRAFT////

app.get('/veterancraft', async (req, res) => { //add async
    const veteranCraft = await appDataSource //add await
    .manager.find(VeteranCraft)

    console.log(veteranCraft)
    res.send(veteranCraft)
})

////CRAFT_INV////

app.get('/craftinv', async (req, res) => { //add async
    const craftInv = await appDataSource //add await
    .manager.find(CraftInv)

    console.log(craftInv)
    res.send(craftInv)
})

app.get('/craftinv/:id', async (req, res) => {

    var id = parseInt(req.params.id);
    const craftInv = await appDataSource.getRepository(CraftInv)
    .findOneBy({id: id}) // findOneBy == single where and return 1
    res.send(craftInv)

})

//Recipes
app.get('/recipe', async (req, res) => { //add async
    const recipe = await appDataSource //add await
    .manager.find(Recipes)

    console.log(recipe)
    res.send(recipe)
})
//Get Distinct Recipe Names
app.get('/recipe/distinct', async (req, res) => { //add async
    const recipeNames = await appDataSource //add await
    .getRepository(Recipes)
    .createQueryBuilder('recipe')
    .select('recipe.craft_name') // Corrected column name
    .distinct(true)
    .getRawMany()

    console.log(recipeNames)
    res.send(recipeNames)
})
//One Recipe
app.get('/recipe/:name', async (req, res) => {

    var name = req.params.name;
    const recipeS = await appDataSource.getRepository(Recipes)
    .findBy({craft_name: name}) // Use findBy with craft_name
    res.send(recipeS)

})

//Update Craft Table and Inventory Table
// app.put("/recipe/:name/craft", async (req, res) => {

//     try {
//         let name = req.params.name
//         let{recipe, inventory} = req.body;

//         //Do not think this is needed. Lecture video use this to increase the amount crafted
//         var recipeReq = await appDataSource.getRepository(Recipes).findOneBy({craft_name: name})

//         //Loop through the inventyory and deduct the inventory amount
//         updateInvAmount(inventory)
        
        
//     } catch (error) {
//         console.error("Something went wrong: " + error)
//         res.status(500).json({ error: 'Internal Server Error' })
//     }
// })

// const updateInvAmount = async (inventory: Inventory[]) => {
    
//     try {
//         for (var inv of inventory){
//             console.log(inv)
//             var inventoryItem = await appDataSource.getRepository(Inventory).findOneBy({material_name: inv.material_name})

//             inventoryItem!.material_amount = inv.material_amount - 
//         }
//     } catch (error) {
//         console.error("Something went wrong: " + error)
//     }
// }

//Get user inventory
app.get('/inventory/user/:id', async (req, res) => {
    try {
        var id = parseInt(req.params.id);
        const inventory = await appDataSource.getRepository(Inventory).createQueryBuilder("inventory")
        .where("inventory.profile_id = :id", { id: id})
        .getMany()

        res.json(inventory)
    } catch (error) {
        console.error("Error finding materials")
        res.status(500).json({ error: 'Internal Server Error' })
    }
})


app.listen(process.env.PORT, () => {
    console.log('Server is listening on port 3000')
})