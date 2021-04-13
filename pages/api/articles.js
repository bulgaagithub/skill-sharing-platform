import { getAllArticles } from "lib/api";

export default async (req, res, next) => {
    const page = parseInt(req.query.page, 10);
    const limit = parseInt(req.query.limit, 10);
    const status = req.query.status;
    // console.log("=======" + Math.random(), page, limit);
    const articles = await getAllArticles(page, limit, status);
      
    res.status(200).json(articles);
};
