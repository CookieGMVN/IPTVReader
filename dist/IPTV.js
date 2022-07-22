"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Downloader_1 = __importDefault(require("./utils/Downloader"));
const Reader_1 = __importDefault(require("./utils/Reader"));
const Server_1 = __importDefault(require("./Server"));
class IPTV {
    start() {
        if (process.argv.length < 3)
            return console.error("UsageError: Missing flags. Please use with --read, --web, --download <url>");
        else {
            if (process.argv[2] == "--download") {
                if (process.argv.length < 4) {
                    console.log("Missing URL to download. Using default URL...");
                    Downloader_1.default.download("https://raw.githubusercontent.com/nzkfld-iptv/iptv/main/index.m3u");
                }
                else {
                    const url = process.argv[3];
                    if (!url.startsWith("https://")) {
                        console.log("UsageError: URL must be a string begin with HTTPS");
                    }
                    else {
                        Downloader_1.default.download(url);
                    }
                }
            }
            if (process.argv[2] == "--web") {
                console.log("Starting Server...");
                Server_1.default.start();
            }
            if (process.argv[2] == "--read") {
                console.log("CAUTION: THIS IS A FUNCTION FOR TESTING. PLEASE USE --web TO LAUNCH WEB APPLICATION!");
                Reader_1.default.read();
            }
        }
    }
}
const Program = new IPTV;
Program.start();
