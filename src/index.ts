import express from "express";
import dotenv from "dotenv";
import { DataSource } from "typeorm";
import { Materials } from "./entity/materials";
import AppDataSource from "./appDatasource";



const cors = require("cors");

const app = express();
app.use(cors());

dotenv.config();

const appDataSource = AppDataSource

app.get('/', (req, res) => {
    res.send('Hello, Devs!');
})

app.get('/materials', async (req, res) => { //add async
    const materials = await AppDataSource //add await
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

    const materials = await AppDataSource.getRepository(Materials)
    .findOneBy({id: id}) // findOneBy == single where and return 1

    console.log(materials)
    res.send(materials)
})

app.listen(process.env.PORT, () => {
    console.log('Server is listening on port 3000')
})