import express from "express";
import dotenv from "dotenv";
import { DataSource } from "typeorm";
import { Materials } from "./entity/materials";
import AppDataSource from "./appDatasource";
import { Inventory } from "./entity/inventory";

const cors = require("cors");

const app = express();
app.use(cors());

dotenv.config();

const appDataSource = AppDataSource

app.get('/', (req, res) => {
    res.send('Hello, Devs!');
})

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

app.listen(process.env.PORT, () => {
    console.log('Server is listening on port 3000')
})