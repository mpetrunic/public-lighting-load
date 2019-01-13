import {QueryInterface} from "sequelize";

module.exports = {
    up: (queryInterface: QueryInterface, Sequelize) => {
        return queryInterface
            .sequelize
            .query(
                "CREATE EXTENSION hstore",
            );
    },
    down: (queryInterface, Sequelize) => {
    },
};
