import { describe, test } from "@jest/globals";
import {
    testAttachTags,
    testDetachTags,
    testUpdate,
} from "../../domain/Article.test.js";
import { InMemoryArticleRepository } from "./InMemoryArticleRepository.js";
import { unixTimestampOf } from "../../domain/Time.js";

/**
 * @import {Tag} from "../../domain/Tag.types.js"
 */

const repository = new InMemoryArticleRepository();

async function createSampleArticle() {
    return await repository.createArticle(
        {
            title: "first post",
            description: "this is my first post",
            body: "Lorem ipsum dolor sit amet",
        },
        unixTimestampOf(0)
    );
}

describe("Common tests from Article", () => {
    const updateTime = unixTimestampOf(100);
    const secondUpdateTime = unixTimestampOf(200);
    test("title update", async () => {
        const article = await createSampleArticle();
        await testUpdate(article, { title: "updated title" }, updateTime);
    });

    test("body update", async () => {
        const article = await createSampleArticle();
        await testUpdate(article, { body: "updated body" }, updateTime);
    });

    test("attachTags", async () => {
        const article = await createSampleArticle();
        const tags = /** @type {Tag[]} */ (["first tag", "second tag"]);
        await testAttachTags(article, tags, updateTime);
    });
    test("detachTags", async () => {
        const article = await createSampleArticle();
        const tags = /** @type {Tag[]} */ (["first tag"]);
        await article.attachTags(tags, updateTime);
        await testDetachTags(article, tags, secondUpdateTime);
    });
});
