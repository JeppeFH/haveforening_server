import express from "express";
import multer from "multer";
import {
  getNewsArticles,
  createNewsArticle,
  updateNewsArticle,
  deleteNewsArticle,
  getNewsArticleById,
} from "../handlers/news.handler.js";

const newsRoute = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/news");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

// GET all news articles
newsRoute.get("/news", async (req, res) => {
  try {
    const newsArticles = await getNewsArticles();
    return res.status(200).send({
      status: "ok",
      message: "Nyheder hentet",
      data: newsArticles,
    });
  } catch (error) {
    return res.status(500).send({
      status: "error",
      message: error.message,
    });
  }
});

// GET news article by ID
newsRoute.get("/news/:id", async (req, res) => {
  try {
    const newsArticle = await getNewsArticleById(req.params.id);
    return res.status(200).send({
      status: "ok",
      data: newsArticle,
    });
  } catch (error) {
    return res.status(500).send({
      status: "error",
      message: error.message,
    });
  }
});

// POST create News article
newsRoute.post("/news", upload.single("image"), async (req, res) => {
  try {
    const { title, info, date } = req.body;

    const newsArticle = {
      title,
      info,
      date,
    };

    if (req.file) {
      newsArticle.image =
        process.env.SERVER_HOST + "/news/" + req.file.filename;
    }

    const result = await createNewsArticle(newsArticle);

    return res.status(201).send({
      status: "oprettet",
      message: "Artikel oprettet",
      data: result,
    });
  } catch (error) {
    return res.status(500).send({
      status: "error",
      message: error.message,
    });
  }
});

// PUT update news article
newsRoute.put("/news", upload.single("image"), async (req, res) => {
  try {
    const { id, title, info, date } = req.body;

    const newsArticle = {
      id,
      title,
      info,
      date,
    };

    if (req.file) {
      newsArticle.image =
        process.env.SERVER_HOST + "/news/" + req.file.filename;
    }

    const result = await updateNewsArticle(newsArticle);

    return res.status(200).send({
      status: "ok",
      message: "Ejendom opdateret",
      data: result,
    });
  } catch (error) {
    return res.status(500).send({
      status: "error",
      message: error.message,
    });
  }
});

// DELETE news article
newsRoute.delete("/news/:id", async (req, res) => {
  try {
    const result = await deleteNewsArticle(req.params.id);

    return res.status(200).send({
      status: "ok",
      message: "Nyheder slettet",
      data: result.title,
    });
  } catch (error) {
    return res.status(500).send({
      status: "error",
      message: error.message,
    });
  }
});

export default newsRoute;
