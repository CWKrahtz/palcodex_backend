import express from "express";
import dotenv from "dotenv";
import { DataSource } from "typeorm";
import { Materials } from "./entity/materials";
import AppDataSource from "./appDatasource";
import { Inventory } from "./entity/inventory";
import { Profiles } from "./entity/profiles";
import { NoviceCraft } from "./entity/novice_craft";
import { AdvanceCraft } from "./entity/advance_craft";
import { VeteranCraft } from "./entity/veteran_craft";
import { CraftInv } from "./entity/craft_inv";

const cors = require("cors");

const app = express();
app.use(cors());

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
    .manager.find(Profiles)

    console.log(profile)
    res.send(profile)
})

app.get('/profiles/:id', async (req, res) => {

    var id = parseInt(req.params.id);

    const profile = await appDataSource.getRepository(Profiles)
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

////CrAFT_INV////

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


app.listen(process.env.PORT, () => {
    console.log('Server is listening on port 3000')
})