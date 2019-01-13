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

    public wattPerKm(street: string): PromiseLike<any> {
        return this.sequelize.query("SELECT segment.name, SUM(lamp.wattage), ST_AsGeoJSON(segment.segment) as segment\n" +
            "FROM (SELECT name, ST_LineSubstring(road.segment, 1000.00*n/road.length,\n" +
            "                                              CASE\n" +
            "                                                WHEN 1000.00*(n+1) < road.length THEN 1000.00*(n+1)/road.length\n" +
            "                                                ELSE 1\n" +
            "                                                  END) As segment\n" +
            "      FROM\n" +
            "           (SELECT name, st_length(way) as length, way as segment FROM planet_osm_roads where name = $street) AS road\n" +
            "             CROSS JOIN generate_series(0,10000) AS n\n" +
            "      WHERE n*1000.00/road.length < 1) as segment\n" +
            " INNER JOIN \"StreetLamps\" as lamp ON ST_DWithin(segment.segment, ST_Transform(lamp.geo, 3857), 20)\n" +
            "GROUP BY segment.name, segment.segment",
            {
                bind: {
                    street,
                },
                type: QueryTypes.SELECT,
            }).then(this.toGeoJson);
    }

    private toGeoJson(rows) {
        let obj;
        let i;

        obj = {
            type: "FeatureCollection",
            features: [],
        };

        for (i = 0; i < rows.length; i++) {
            let item;
            let feature;
            let geometry;
            item = rows[i];

            geometry = JSON.parse(item.segment);
            delete item.segment;

            feature = {
                type: "Feature",
                properties: item,
                geometry,
            };

            obj.features.push(feature);
        }
        return obj;
    }
}

export default new StreetService();
