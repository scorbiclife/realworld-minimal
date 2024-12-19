import type { Tag } from "./Tag";
import type { UnixTimestamp } from "./TimeTypes";

export type ArticleId = number & { type: "ArticleId" };

export interface Article extends ArticleCommand, ArticleQuery {}

export interface ArticleCommand {
    update(articleDiff: Partial<ArticleData>, at: UnixTimestamp): Promise<void>;
    attachTags(tags: Tag[], at: UnixTimestamp): Promise<void>;
    detachTags(tags: Tag[], at: UnixTimestamp): Promise<void>;
}

export interface ArticleQuery {
    getJson(): Promise<ArticleJson>;
}

export interface ArticleRepository {
    saveArticle(articleData: ArticleData, at: UnixTimestamp): Promise<Article>;
    getArticleById(articleId: ArticleId): Promise<Article>;
}

/**
 * TODO: add author_id
 */
export type ArticleData = {
    title: string;
    description: string;
    body: string;
};

export type ArticleJson = {
    articleId: number;
    authorId: number;
    title: string;
    description: string;
    body: string;
    tags: string[];
    createdAt: number;
    updatedAt: number;
    deletedAt: number | null;
};
