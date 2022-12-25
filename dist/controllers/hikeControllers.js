import { getAllHikes } from "../services/hikeServices.js";
export const getHikesController = async (_, res) => {
    try {
        const hikes = await getAllHikes();
        return res.status(200).json({ hikes });
    }
    catch (err) {
        console.log(err.message);
        return res.sendStatus(500);
    }
};
//# sourceMappingURL=hikeControllers.js.map