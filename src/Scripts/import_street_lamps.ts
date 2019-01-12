import washingtonStreetLampService from "../Services/Api/WashingtonDCStreetLampService";
import db from "../Services/Database";
import logger from "../Services/Logger";
import StreetLamp from "../Services/Models/StreetLamp";

(async () => {
    await db.init();
    logger.info("Deleting existing street lamps");
    await db.sequelize.query(`DELETE FROM "StreetLamps"`);
    logger.info("Deleted existing street lamps");
    logger.info("Fetching washington street lamps data from external api...");
    const streetLamps = await washingtonStreetLampService.getAll();
    if (!streetLamps) {
        return;
    }
    logger.info(`Fetched ${streetLamps.length} lamps, storing in db...`);
    for (const streetLamp of streetLamps) {
        await new StreetLamp(streetLamp.x, streetLamp.y, streetLamp.wattage1).save();
    }
    logger.info("Finished importing street lamps.");
    process.exit(0);
    return;
})();
