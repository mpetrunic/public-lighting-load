import axios, {AxiosInstance, AxiosResponse} from "axios";
import * as csv from "csv-parse";
import {pipeline} from "stream";
import logger from "../Logger";
import * as isValidCoord from "is-valid-coordinates";

export interface IStreetLamp {
    readonly x: number;
    readonly y: number;
    readonly wattage1: number;
}

class WashingtonDCStreetLampService {

    private client: AxiosInstance;

    constructor() {
        this.client = axios.create({
            baseURL: "https://opendata.arcgis.com",
            timeout: 10000,
            params: {
                outSR: 4326,
                f: "json",
                where: "1=1",
            },
        });
    }

    public async getAll(): Promise<IStreetLamp[]> {
        try {
            const streetLamps = [];
            const parser = csv({
                columns: (record) => {
                    return record.map( (column) => column.trim().toLowerCase() );
                },
                cast: true,
            });
            const response = await this.client.get(
                "/datasets/6cb6520725b0489d9a209a337818fad1_90.csv",
                {
                    responseType: "stream",
                },
            );
            parser.on("readable", () => {
                let record = parser.read();
                while (record) {
                    logger.info(JSON.stringify({
                        x: record.x,
                        y: record.y,
                        watt: record.wattage1,
                    }));
                    if (this.validRecord(record)) {
                        streetLamps.push(record);
                    }
                    record = parser.read();
                }
            });

            parser.on("error", (err) => {
                logger.error(JSON.stringify(err));
            });

            return new Promise<IStreetLamp[]>((resolve, reject) => {
                pipeline(response.data, parser, (err) => {
                    if (err) {
                        reject([]);
                    } else {
                        resolve(streetLamps);
                    }
                });
            });

        } catch (e) {
            logger.error(JSON.stringify(e));
            return null;
        }
    }

    private validRecord(record: IStreetLamp) {
        return isValidCoord(record.x, record.y) && record.wattage1 && record.wattage1 > 0;
    }
}

export default new WashingtonDCStreetLampService();
