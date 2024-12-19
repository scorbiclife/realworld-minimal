import { describe, test } from "@jest/globals";
import { testArticleRepository } from "#domain/ArticleUseCaseTestHelper.js";
import { InMemoryArticleRepository } from "./InMemoryArticleRepository.js";

describe("InMemoryArticleRepository", () => {
    test("article", async () => {
        const repo = new InMemoryArticleRepository();
        await testArticleRepository({ repo });
    });
});
