import { DataTypes, Model} from "sequelize";
import connectionDB from "../database/conectionDB";
import UserModel from "./userModel";
import { NewsInterface } from "../interfaces/newsInterface";

interface newsCreationAttributes extends Model<NewsInterface>, NewsInterface {}

const newsModel = connectionDB.define<newsCreationAttributes>('news', {
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
    news: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    published_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        allowNull: true,
    },
    updated_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        allowNull: true,
    },
    num_likes: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    image_url: {
        type: DataTypes.STRING,
        allowNull: false,
    }
},
{
    timestamps: false,
});

export default newsModel;