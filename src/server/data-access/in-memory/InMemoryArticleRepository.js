import { InMemoryArticle } from "./InMemoryArticle.js";

/**
 * @typedef {import("./InMemoryArticle.js").Article} Article
 * @typedef {import("./InMemoryArticle.js").ArticleId} ArticleId
 * @typedef {import("./InMemoryArticle.js").UnixTimestamp} UnixTimestamp
 * @typedef {import("./InMemoryArticle.js").ArticleData} ArticleData
 * @typedef {import("../../domain/ArticleUseCaseTestHelper.js").ArticleFactory} ArticleFactory
 */

/**
 * @implements {ArticleFactory}
 */
export class InMemoryArticleRepository {
    constructor() {
        /**
         * @type {InMemoryArticle[]}
         */
        this.articles = [];
        this.tags = [];
    }
    /**
     * @param {ArticleData} articleData
     * @param {UnixTimestamp} createdAt
     * @returns {Promise<Article>}
     */
    async saveArticle(articleData, createdAt) {
        const newArticleId = /** @type {ArticleId} */ (this.articles.length);
        const newArticle = new InMemoryArticle({
            repository: this,
            articleId: newArticleId,
            articleData,
            createdAt: createdAt,
        });
        this.articles[newArticleId] = newArticle;
        this.tags[newArticleId] = new Set();
        return newArticle;
    }

    async getArticleById(articleId) {
        return this.articles[articleId];
    }
}
