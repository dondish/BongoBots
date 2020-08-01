const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    dialect: 'postgres'
});

module.exports.sequelize = sequelize;

module.exports.authenticate = async () => {
    try {
        await sequelize.authenticate();
        console.log('Authenticated to the database');
    } catch (error) {
        console.error('Failed to authenticate to the database:', error);
    }
}

module.exports.Bot = sequelize.define('Bot', {
    id: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    avatar: {
        type: DataTypes.STRING,
        allowNull: false
    },
    prefix: {
        type: DataTypes.STRING,
        allowNull: false
    },
    library: {
        type: DataTypes.STRING,
        allowNull: true
    },
    invite: {
        type: DataTypes.STRING,
        allowNull: true
    },
    short_desc: {
        type: DataTypes.STRING,
        allowNull: false
    },
    long_desc: {
        type: DataTypes.STRING,
        allowNull: false
    },
    support_server: {
        type: DataTypes.STRING,
        allowNull: true
    },
    github: {
        type: DataTypes.STRING,
        allowNull: true
    },
    website: {
        type: DataTypes.STRING,
        allowNull: true
    },
    mod_notes: {
        type: DataTypes.STRING,
        allowNull: true
    },
    ownerId: {
        type: DataTypes.STRING,
        allowNull: false
    },
    ownersIds: {
        type: DataTypes.ARRAY(Sequelize.STRING),
        allowNull: false,
        defaultValue: []
    },
    approved: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    verified: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    server_count: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    apiToken: {
        type: DataTypes.STRING,
        allowNull: false
    }
});
