// 2 modelos (tablas) para mi bbdd 
import { DataTypes, Model } from 'sequelize';
import connectionDB from '../database/conectionDB';
import { Users } from '../interfaces/userInterface';

interface UserModel extends Model<Users>, Users {}
const UserModel= connectionDB.define<UserModel>('users', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    rol: {
        type: DataTypes.STRING,
        defaultValue: 'usuario'
    },
    name: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    avatar: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    created_at: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: DataTypes.NOW,
    },
    last_login: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: DataTypes.NOW 
    }
    ,
    status: {
        type: DataTypes.ENUM('active','inactive','deleted'), 
        allowNull: true,
        defaultValue: 'active'
    },
    bio: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    birth_date: {
        type: DataTypes.DATE,
        allowNull: true,
    },
    
    });

    export default UserModel;