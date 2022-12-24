import jwt from "jsonwebtoken";
export const createJwt = (id, role) => {
    const token = jwt.sign({ id, role }, process.env.JWT_SECRET, {
        expiresIn: "1d",
    });
    return token;
};
export const sendJwtToClient = (res, token) => {
    res.cookie("token", token, {
        httpOnly: true,
        sameSite: "none",
        secure: true,
    });
};
export const decodeJwtPayload = (token) => {
    const payload = token.split(".")[1];
    const decodedValue = JSON.parse(Buffer.from(payload, "base64").toString("ascii"));
    return decodedValue;
};
export const clearJwt = (res) => {
    res.clearCookie("token", {
        sameSite: "none",
        secure: true,
    });
};
//# sourceMappingURL=authServices.js.map