import {QueryInterface} from "sequelize";

module.exports = {
    up: (queryInterface: QueryInterface, Sequelize) => {
        return queryInterface
            .sequelize
            .query(
                `ALTER TABLE ${queryInterface.quoteTable("StreetLamps")} ADD COLUMN geo geometry(Point,4326)`,
            );
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface
            .sequelize
            .query(
                `ALTER TABLE ${queryInterface.quoteTable("StreetLamps")} DROP column geo`,
            );
    },
};
