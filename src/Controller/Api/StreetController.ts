import { Request, Response } from "express";
import streetService from "../../Services/StreetService";

export default class StreetsController {

    public static async getStreets(req: Request, res: Response): Promise<any> {
        const streets = await streetService.all();
        return res.json(streets);
    }

    public static getStreet(req: Request, res: Response): void {
        res.json({message: "Sorry can't help you"});
    }

}
