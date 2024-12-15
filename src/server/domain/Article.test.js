import { expect } from "@jest/globals";

/**
 * @import {Article} from "./Article.types"
 * @import {Tag} from "./Tag.types"
 * @import {UnixTimestamp} from "./Time.types"
 */

/**
 * @param {Article} article
 * @param {(article: Article) => Promise<void>} test
 */
async function testUpdatedAtChange(article, test) {
    const { updatedAt: initialUpdatedAt } = await article.toJson();
    await test(article);
    const { updatedAt: newUpdatedAt } = await article.toJson();
    expect(newUpdatedAt).not.toEqual(initialUpdatedAt);
}

/**
 * @typedef {Partial<import("./Article.types").ArticleData>} ArticleUpdate
 *
 * @param {Article} article
 * @param {ArticleUpdate} articleUpdate
 * @param {UnixTimestamp} at
 */
export async function testUpdate(article, articleUpdate, at) {
    await testUpdatedAtChange(article, async (article) => {
        const {
            title: oldTitle,
            body: oldBody,
            description: oldDescription,
        } = await article.toJson();
        await article.update(articleUpdate, at);
        const {
            title: newTitle,
            body: newBody,
            description: newDescription,
            updatedAt,
        } = await article.toJson();
        expect(newTitle).toStrictEqual(articleUpdate.title ?? oldTitle);
        expect(newBody).toStrictEqual(articleUpdate.body ?? oldBody);
        expect(newDescription).toStrictEqual(
            articleUpdate.description ?? oldDescription
        );
        expect(updatedAt).toStrictEqual(at);
    });
}

/**
 * @param {Article} article
 * @param {Tag[]} tags
 * @param {UnixTimestamp} at
 */
export async function testAttachTags(article, tags, at) {
    await testUpdatedAtChange(article, async (article) => {
        article.attachTags(tags, at);
        const articleJson = await article.toJson();
        tags.forEach((tag) => {
            expect(articleJson.tags.includes(tag)).toBeTruthy();
        });
    });
}

/**
 * @param {Article} article
 * @param {Tag[]} tags
 * @param {UnixTimestamp} at
 */
export async function testDetachTags(article, tags, at) {
    await testUpdatedAtChange(article, async (article) => {
        article.detachTags(tags, at);
        const articleJson = await article.toJson();
        tags.forEach((tag) => {
            expect(articleJson.tags.includes(tag)).toBeFalsy();
        });
    });
}
