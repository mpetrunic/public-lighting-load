import * as express from "express";
import HelpController from "../Controller/Api/HelpController";
import StreetsController from "../Controller/Api/StreetController";

const router = express.Router();

router.get("/help", HelpController.getHelp);
router.get("/streets", StreetsController.getStreets);
router.get("/streets/{street}", StreetsController.getStreet);

export default router;
