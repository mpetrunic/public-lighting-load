import {QueryTypes} from "sequelize";
import {Sequelize} from "sequelize-typescript";
import db from "./Database";

class StreetService {

    private readonly sequelize: Sequelize;

    constructor() {
        this.sequelize = db.sequelize;
    }

    public all(): PromiseLike<string[]> {
        return this.sequelize.query(
            "SELECT DISTINCT name from  planet_osm_roads" +
            " WHERE " +
            "name IS NOT NULL " +
            "AND highway IN ('motorway', 'primary', 'secondary', 'residential');",
            {
                type: QueryTypes.SELECT,
            },
        ).then((result) => {
            return result.map((street) => street.name);
        });
    }

}

export default new StreetService();
