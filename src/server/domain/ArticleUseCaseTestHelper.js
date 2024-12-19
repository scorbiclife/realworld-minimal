import { expect } from "@jest/globals";
import { unixTimestampOf } from "./Time.js";

/**
 * @typedef {import("./ArticleUseCase.js").ArticleRepository} ArticleFactory
 */

/**
 * @param {{ repo: ArticleFactory }} param0
 */
export async function testArticleRepository({ repo }) {
    const INITIAL_TIME = unixTimestampOf(0);
    const UPDATE_TIME = unixTimestampOf(1);
    const initialArticle = {
        title: "my first post",
        description: "this is my first post",
        body: "lorem ipsum dolor sit amet",
    };
    const article = await repo.saveArticle(initialArticle, INITIAL_TIME);
    article.update({}, UPDATE_TIME);
    const articleJson = await article.getJson();
    expect(articleJson).toMatchObject({
        title: "my first post",
        description: "this is my first post",
        body: "lorem ipsum dolor sit amet",
        createdAt: INITIAL_TIME,
        updatedAt: UPDATE_TIME,
        deletedAt: null,
    })
}
