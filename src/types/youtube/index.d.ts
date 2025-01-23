/// <reference path="node_modules/@types/youtube/index.d.ts" />

declare namespace YT {
    export interface VideoData {
        isLive?: boolean
    }
    interface Player {
        getVideoData() : VideoData;
    }
}

interface Video {
    name:string
    code:string
}