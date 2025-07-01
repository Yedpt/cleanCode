import  { DataTypes, Model} from "sequelize";
import connectionDB from "../database/conectionDB";
import UserModel from "./userModel";
import { ResourceInterface } from "../interfaces/resourceInterface";

interface ResourceCreationAttributes extends Model<ResourceInterface>, ResourceInterface {}

const resourceModel = connectionDB.define<ResourceCreationAttributes>('resources', {
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
    }
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    resource: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    resource_url: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    published_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
    updated_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        allowNull: true,
    },
    image_url: {
        type: DataTypes.STRING,
        allowNull: true,
    }
   },

   {
    timestamps: false,
   });

   export default resourceModel;