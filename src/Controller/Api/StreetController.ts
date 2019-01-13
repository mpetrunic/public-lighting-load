import { Request, Response } from "express";
import streetService from "../../Services/StreetService";

export default class StreetsController {

    public static async getStreets(req: Request, res: Response): Promise<any> {
        const streets = await streetService.all();
        return res.json(streets);
    }

    public static async getStreet(req: Request, res: Response): Promise<any> {
        return res.json(await streetService.wattPerKm(req.params.street));
    }

}
