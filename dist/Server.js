"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const M3UReader = __importStar(require("iptv-playlist-parser"));
const fs = __importStar(require("fs"));
const cors_1 = __importDefault(require("cors"));
class Server {
    static start() {
        const app = (0, express_1.default)();
        app.set("view engine", "ejs");
        app.use((0, cors_1.default)());
        app.get("/", async function (req, res) {
            if (!req.query.path)
                res.render("index.ejs", { url: "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8" });
            else
                res.render("index.ejs", { url: req.query.path });
        });
        app.get("/api/getChannels", function (req, res) {
            let playlist = fs.readFileSync("list.m3u", { encoding: "utf-8" });
            const result = M3UReader.parse(playlist);
            res.json(result.items);
        });
        app.get("/api/bypassCors", function (req, res) {
            require("bypasscors")(req.query.url, function (data) {
                return res.send(data);
            });
        });
        app.listen(8080, () => {
            console.log("Server has started at `http://localhost:8080`!");
        });
    }
}
exports.default = Server;
