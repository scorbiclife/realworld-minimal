import type { Tag } from "./Tag.types";
import { UnixTimestamp } from "./Time.types";

export type ArticleId = number & { type: "ArticleId" };

export interface Article {
    updateTitleTo(newTitle: string, at: UnixTimestamp): void;
    updateBodyTo(newBody: string, at: UnixTimestamp): void;
    attachTags(tags: Tag[], at: UnixTimestamp): void;
    detachTags(tags: Tag[], at: UnixTimestamp): void;
    tags: Set<Tag>;
    toJson(): ArticleJson;
}

export interface ArticleFactory {
    createArticle(articleData: ArticleData, at: UnixTimestamp): Article;
}

/**
 * TODO: add author_id
 */
export type ArticleData = {
    title: string;
    slug: string;
    description: string;
    body: string;
}

export type ArticleJson = {
    articleId: number;
    authorId: number;
    title: string;
    slug: string;
    description: string;
    body: string;
    createdAt: number;
    updatedAt: number;
    deletedAt: number | null;
};
