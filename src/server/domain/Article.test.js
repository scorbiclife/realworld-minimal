import { expect } from "@jest/globals";

/**
 * @import {Article} from "./Article.types"
 * @import {Tag} from "./Tag.types"
 * @import {UnixTimestamp} from "./Time.types"
 */

/**
 * @param {Article} article
 * @param {(article: Article) => void} test
 */
function testUpdatedAtChange(article, test) {
    const initialUpdatedAt = article.toJson().updatedAt;
    test(article);
    const newUpdatedAt = article.toJson().updatedAt;
    expect(newUpdatedAt).not.toEqual(initialUpdatedAt);
}

/**
 * @param {Article} article
 * @param {string} newTitle
 * @param {UnixTimestamp} at
 */
export function testTitleUpdate(article, newTitle, at) {
    testUpdatedAtChange(article, (article) => {
        article.updateTitleTo(newTitle, at);
        const updatedArticleJson = article.toJson();
        expect(updatedArticleJson.title).toStrictEqual(newTitle);
    });
}

/**
 * @param {Article} article
 * @param {string} newBody
 * @param {UnixTimestamp} at
 */
export function testBodyUpdate(article, newBody, at) {
    testUpdatedAtChange(article, (article) => {
        article.updateBodyTo(newBody, at);
        const updatedArticleJson = article.toJson();
        expect(updatedArticleJson.body).toStrictEqual(newBody);
    });
}

/**
 * @param {Article} article
 * @param {Tag[]} tags
 * @param {UnixTimestamp} at
 */
export function testAttachTags(article, tags, at) {
    testUpdatedAtChange(article, (article) => {
        article.attachTags(tags, at);
        tags.forEach(tag => expect(article.tags.has(tag)).toBeTruthy());
    });
}

/**
 * @param {Article} article
 * @param {Tag[]} tags
 * @param {UnixTimestamp} at
 */
export function testDetachTags(article, tags, at) {
    testUpdatedAtChange(article, (article) => {
        article.detachTags(tags, at);
        tags.forEach((tag) => expect(article.tags.has(tag)).toBeFalsy());
    });
}
