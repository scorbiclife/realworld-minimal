import { InMemoryArticle } from "./InMemoryArticle.js";

/**
 * @import {Article, ArticleData, ArticleFactory, ArticleId} from "../../domain/Article.types"
 * @import {UnixTimestamp} from "../../domain/Time.types"
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
    async createArticle(articleData,createdAt) {
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
}
