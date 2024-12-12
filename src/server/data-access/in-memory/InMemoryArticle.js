/**
 * @import { Article, ArticleData, ArticleFactory, ArticleId, ArticleJson }
 *  from "../../domain/Article.types"
 * @import { Tag } from "../../domain/Tag.types"
 * @import { UnixTimestamp } from "../../domain/Time.types"
 */

/**
 * @implements {Article}
 */
export class InMemoryArticle {
    /**
     * @param {object} keywordArgs
     * @property {InMemoryArticleRepository} repository
     * @property {ArticleId} articleId
     * @property {ArticleData} articleData
     * @property {UnixTimestamp} createdAt
     */
    constructor({ repository, articleId, articleData, createdAt }) {
        this.repository = repository;
        this.articleId = articleId;
        this.articleData = articleData;
        this.createdAt = createdAt;
        this.updatedAt = createdAt;
        /** @type {UnixTimestamp | null} */
        this.deletedAt = null;
    }

    /**
     * @returns {InMemoryArticle}
     */
    get #article() {
        return this.repository.articles[this.articleId];
    }

    /**
     * @returns {Set<Tag>}
     */
    get #tags() {
        return this.repository.tags[this.articleId];
    }

    /**
     * @param {UnixTimestamp} updatedAt
     */
    #updateAt(updatedAt) {
        this.#article.updatedAt = updatedAt;
    }

    /**
     * @param {string} newTitle
     * @param {UnixTimestamp} updatedAt
     */
    updateTitleTo(newTitle, updatedAt) {
        this.#article.articleData.title = newTitle;
        this.#updateAt(updatedAt);
    }

    /**
     * @param {string} newBody
     * @param {UnixTimestamp} updatedAt
     */
    updateBodyTo(newBody, updatedAt) {
        this.#article.articleData.body = newBody;
        this.#updateAt(updatedAt);
    }

    /**
     * @param {Tag[]} tags
     * @param {UnixTimestamp} updatedAt
     */
    attachTags(tags, updatedAt) {
        tags.forEach((tag) => this.#tags.add(tag));
        this.#updateAt(updatedAt);
    }

    /**
     * @param {Tag[]} tags
     * @param {UnixTimestamp} updatedAt
     */
    detachTags(tags, updatedAt) {
        tags.forEach((tag) => this.#tags.delete(tag));
        this.#updateAt(updatedAt)
    }

    /**
     * @returns {Set<Tag>}
     */
    get tags() {
        return new Set(this.#tags);
    }

    /**
     * @returns {ArticleJson}
     */
    toJson() {
        return {
            articleId: this.articleId,
            authorId: 0,
            title: this.#article.articleData.title,
            slug: this.#article.articleData.slug,
            description: this.#article.articleData.description,
            body: this.#article.articleData.body,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt,
            deletedAt: this.deletedAt,
        };
    }
}
