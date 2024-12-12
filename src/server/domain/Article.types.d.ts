import type { Tag } from "./Tag.types";
import { UnixTimestamp } from "./Time.types";

export type ArticleId = number & { type: "ArticleId" };

export interface Article {
    updateTitleTo(newTitle: string, at: UnixTimestamp): Promise<void>;
    updateBodyTo(newBody: string, at: UnixTimestamp): Promise<void>;
    attachTags(tags: Tag[], at: UnixTimestamp): Promise<void>;
    detachTags(tags: Tag[], at: UnixTimestamp): Promise<void>;
    toJson(): Promise<ArticleJson>;
}

export interface ArticleFactory {
    createArticle(articleData: ArticleData, at: UnixTimestamp): Promise<Article>;
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
    tags: string[];
    createdAt: number;
    updatedAt: number;
    deletedAt: number | null;
};
