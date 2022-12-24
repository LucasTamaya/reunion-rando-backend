import bcrypt from "bcrypt";
import { getUserByEmail, createNewUser } from "../services/userServices.js";
import { createJwt, sendJwtToClient, clearJwt, } from "../services/authServices.js";
const loginErrorResponse = {
    isError: true,
};
export const registerController = async (req, res) => {
    const body = req.body;
    try {
        const user = await getUserByEmail(body.email);
        if (user) {
            return res.sendStatus(409);
        }
        const { id, role } = await createNewUser(body);
        const token = createJwt(id, role);
        sendJwtToClient(res, token);
        return res.sendStatus(200);
    }
    catch (err) {
        console.log(err);
        return res.sendStatus(500);
    }
};
export const loginController = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await getUserByEmail(email);
        if (!user) {
            return res.status(200).json(loginErrorResponse);
        }
        const matchingPassword = await bcrypt.compare(password, user.password);
        if (!matchingPassword) {
            return res.status(200).json(loginErrorResponse);
        }
        const token = createJwt(user.id, user.role);
        sendJwtToClient(res, token);
        return res.status(200).json({ role: user.role, id: user.id });
    }
    catch (err) {
        return res.sendStatus(500);
    }
};
export const logoutController = async (_, res) => {
    clearJwt(res);
    return res.sendStatus(200);
};
//# sourceMappingURL=authControllers.js.map