import { DataTypes } from "sequelize";
import db from "../config/db.js";

const Storage = db.define('storage', 
    {
        url: {
            type: DataTypes.STRING
        },
        filename:{
            type: DataTypes.STRING
        }
    },
    {
        timestamps: true
    });

export default Storage;