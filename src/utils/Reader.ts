import * as M3UReader from "iptv-playlist-parser";
import * as fs from "fs";

export default class Reader {
    public static read() {
        const playlist = fs.readFileSync(__dirname + "/../list.m3u", { encoding: "utf-8" });
        const result = M3UReader.parse(playlist);
        console.log(result);
    }
}