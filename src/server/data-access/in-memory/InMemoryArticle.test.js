import { describe, test } from "@jest/globals";
import {
    testAttachTags,
    testBodyUpdate,
    testDetachTags,
    testTitleUpdate,
} from "../../domain/Article.test.js";
import { InMemoryArticleRepository } from "./InMemoryArticleRepository.js";
import { unixTimestampOf } from "../../domain/Time.js";

/**
 * @import {Tag} from "../../domain/Tag.types.js"
 */

const repository = new InMemoryArticleRepository();

function createSampleArticle() {
    return repository.createArticle(
        {
            title: "first post",
            slug: "first-post",
            description: "this is my first post",
            body: "Lorem ipsum dolor sit amet",
        },
        unixTimestampOf(0)
    );
}

describe("Common tests from Article", () => {
    const updateTime = unixTimestampOf(100);
    const secondUpdateTime = unixTimestampOf(200);
    test("updateTitleTo", () => {
        const article = createSampleArticle();
        testTitleUpdate(article, "updated title", updateTime);
    });

    test("updateBodyTo", () => {
        const article = createSampleArticle();
        testBodyUpdate(article, "updated body", updateTime);
    });

    test("attachTags", () => {
        const article = createSampleArticle();
        const tags = /** @type {Tag[]} */ (["first tag", "second tag"]);
        testAttachTags(article, tags, updateTime);
    });
    test("detachTags", () => {
        const article = createSampleArticle();
        const tags = /** @type {Tag[]} */ (["first tag"]);
        article.attachTags(tags, updateTime);
        testDetachTags(article, tags, secondUpdateTime);
    });
});
