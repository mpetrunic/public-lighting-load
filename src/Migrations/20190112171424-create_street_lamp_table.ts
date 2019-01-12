import {QueryInterface} from "sequelize";

module.exports = {
    up: (queryInterface: QueryInterface, Sequelize) => {
        return queryInterface.createTable("StreetLamps", {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            wattage: {
                type: Sequelize.STRING,
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
                defaultValue: () => new Date(),
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE,
                defaultValue: () => new Date(),
            },
        });
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable("Examples");
    },
};
