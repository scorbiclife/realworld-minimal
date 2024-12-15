import { UnixTimestamp } from "./TimeTypes"

export type ObjectTimestamps = {
    createdAt: UnixTimestamp;
    updatedAt: UnixTimestamp;
    deletedAt: UnixTimestamp | null;
}