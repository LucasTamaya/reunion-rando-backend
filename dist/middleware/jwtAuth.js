import jwt from "jsonwebtoken";
export const jwtAuth = (req, res, next) => {
    const token = req.cookies.token;
    console.log("the token :", token);
    try {
        jwt.verify(token, process.env.JWT_SECRET);
        next();
    }
    catch (err) {
        console.error(err);
        res.clearCookie("token");
        return res.sendStatus(401);
    }
};
//# sourceMappingURL=jwtAuth.js.map