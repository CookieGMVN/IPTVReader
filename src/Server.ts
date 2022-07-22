import express from "express";
import * as M3UReader from "iptv-playlist-parser";
import * as fs from "fs";
import cors from "cors";
export default class Server {
    public static start() {
        const app = express();
        app.set("view engine", "ejs");
        app.use(cors());

        app.get("/", async function (req, res) {
            if (!req.query.path) res.render("index.ejs", { url: "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8" });
            else res.render("index.ejs", { url: req.query.path });
        })

        app.get("/api/getChannels", function (req, res) {
            let playlist: string = fs.readFileSync("list.m3u", { encoding: "utf-8" });
            const result = M3UReader.parse(playlist);
            res.json(result.items);
        })

        app.listen(8080, () => {
            console.log("Server has started at `http://localhost:8080`!");
        });
    }
}