import { DataTypes, Model, Optional } from "sequelize";
import connectionDB from "../database/conectionDB";
import UserModel from "./userModel";
import { videoAttributes } from "../interfaces/videoInterfaces";


interface videoCreationAttributes extends Model<videoAttributes>, videoAttributes {}

const videoModel = connectionDB.define<videoCreationAttributes>('videos', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    user_id: {
        type: DataTypes.INTEGER,
        references: {
            model: UserModel,
            key: 'id',
        },
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    video_url: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    published_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
    updated_at: {
        type: DataTypes.DATE,
        allowNull: true,
    },
    thumbnail: {
        type: DataTypes.STRING,
        allowNull: true,
    },
},

);

export default videoModel;
