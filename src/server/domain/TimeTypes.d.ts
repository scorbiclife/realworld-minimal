export type UnixTimestamp = number & { type: "UnixTimestamp" };
export declare function unixTimestampOf(n: number): UnixTimestamp;