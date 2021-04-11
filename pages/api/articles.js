import { getAllArticles } from "lib/api";
const asyncHandler = require("middleware/asyncHandler")

export default asyncHandler(async (req, res, next) => {
    const page = parseInt(req.query.page, 10);
    const limit = parseInt(req.query.limit, 10);
    // console.log("=======" + Math.random(), page, limit);
    const articles = await getAllArticles(page, limit);
      
    res.status(200).json(articles);
});
