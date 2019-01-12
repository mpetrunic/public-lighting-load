import {QueryTypes} from "sequelize";
import db from "../Database";
import logger from "../Logger";

export default class StreetLamp {

    public readonly x: number;
    public readonly y: number;
    public readonly watt: number;

    constructor(x: number, y: number, watt: number) {
        this.x = x;
        this.y = y;
        this.watt = watt;
    }

    public save() {
        return db.sequelize.query(
            "INSERT INTO \"StreetLamps\"(wattage, geo, \"createdAt\", \"updatedAt\")" +
            " VALUES($wattage, ST_GeomFromText($geo, 4326), $date, $date)",
            {
            bind: {
                wattage: this.watt,
                geo: `POINT(${this.x} ${this.y})`,
                date: new Date(),
            },
            type: QueryTypes.INSERT,
        });
    }
}
