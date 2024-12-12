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
 * @param {Article} article
 * @param {string} newTitle
 * @param {UnixTimestamp} at
 */
export async function testTitleUpdate(article, newTitle, at) {
    await testUpdatedAtChange(article, async (article) => {
        article.updateTitleTo(newTitle, at);
        const updatedArticleJson = await article.toJson();
        expect(updatedArticleJson.title).toStrictEqual(newTitle);
    });
}

/**
 * @param {Article} article
 * @param {string} newBody
 * @param {UnixTimestamp} at
 */
export async function testBodyUpdate(article, newBody, at) {
    await testUpdatedAtChange(article, async (article) => {
        article.updateBodyTo(newBody, at);
        const updatedArticleJson = await article.toJson();
        expect(updatedArticleJson.body).toStrictEqual(newBody);
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
