/**
 * @typedef {import('#domain/ArticleUseCase.d.ts').Article} Article
 * @typedef {import('#domain/ArticleUseCase.d.ts').ArticleData} ArticleData
 * @typedef {import('#domain/ArticleUseCase.d.ts').ArticleId} ArticleId
 * @typedef {import('#domain/ArticleUseCase.d.ts').ArticleJson} ArticleJson
 * @typedef {import('#domain/ArticleUseCase.d.ts').ArticleRepository} ArticleRepository
 * @typedef {import('#domain/Tag.d.ts').Tag} Tag
 * @typedef {import('#domain/Time.types.d.ts').UnixTimestamp} UnixTimestamp
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
     * @param {Partial<ArticleData>} articleUpdate
     * @param {UnixTimestamp} updatedAt
     */
    async update(articleUpdate, updatedAt) {
        if (articleUpdate.title !== null && articleUpdate.title !== undefined) {
            this.#article.articleData.title = articleUpdate.title;
        }
        if (articleUpdate.body !== null && articleUpdate.body !== undefined) {
            this.#article.articleData.body = articleUpdate.body;
        }
        if (articleUpdate.description !== null && articleUpdate.description !== undefined) {
            this.#article.articleData.description = articleUpdate.description;
        }
        this.#updateAt(updatedAt);
    }

    /**
     * @param {string} newBody
     * @param {UnixTimestamp} updatedAt
     */
    async updateBodyTo(newBody, updatedAt) {
        this.#article.articleData.body = newBody;
        this.#updateAt(updatedAt);
    }

    /**
     * @param {Tag[]} tags
     * @param {UnixTimestamp} updatedAt
     */
    async attachTags(tags, updatedAt) {
        tags.forEach((tag) => this.#tags.add(tag));
        this.#updateAt(updatedAt);
    }

    /**
     * @param {Tag[]} tags
     * @param {UnixTimestamp} updatedAt
     */
    async detachTags(tags, updatedAt) {
        tags.forEach((tag) => this.#tags.delete(tag));
        this.#updateAt(updatedAt)
    }

    /**
     * @returns {Promise<ArticleJson>}
     */
    async getJson() {
        return {
            articleId: this.articleId,
            authorId: 0,
            title: this.#article.articleData.title,
            description: this.#article.articleData.description,
            body: this.#article.articleData.body,
            tags: [...this.#tags].sort(),
            createdAt: this.createdAt,
            updatedAt: this.updatedAt,
            deletedAt: this.deletedAt,
        };
    }
}
