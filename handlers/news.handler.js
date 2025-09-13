import newsModel from "../models/news.model.js";
import dbConnect from "../dbConnect.js";

/* Get all news articles */
export const getNewsArticles = async () => {
  try {
    await dbConnect();
    const newsArticles = await newsModel.find({});
    return newsArticles;
  } catch (error) {
    throw new Error("Der skete en fejl", error);
  }
};

// Create News Article
export const createNewsArticle = async (body) => {
  try {
    await dbConnect();
    const newsArticle = await newsModel.create(body);
    return newsArticle;
  } catch (error) {
    console.error("Der skete en fejl", error);
    throw new Error("Der skete en fejl", error);
  }
};

// Update News article
export const updateNewsArticle = async (body) => {
  try {
    await dbConnect();
    const NewsArticle = await newsModel.findById(body.id);

    if (!NewsArticle) {
      throw new Error("Der skete en fejl:", error);
    }

    const { id, ...updateData } = body;

    const updatedNewsArticle = await newsModel.findByIdAndUpdate(
      id,
      updateData
    );

    return updatedNewsArticle;
  } catch (error) {
    throw new Error("Opdatering af nyheder fejlede: " + error.message);
  }
};

// Delete News Article
export const deleteNewsArticle = async (id) => {
  try {
    await dbConnect();
    const deleteNewsArticle = await newsModel.findByIdAndDelete(id);
    return deleteNewsArticle;
  } catch (error) {
    throw new Error("Der skete en fejl under sletning af nyhed:", error);
  }
};

// Get News Article by ID
export const getNewsArticleById = async (id) => {
  try {
    await dbConnect();
    const newsArticle = await newsModel.findById(id);
    return newsArticle;
  } catch (error) {
    throw new Error("Der skete en fejl:", error);
  }
};
