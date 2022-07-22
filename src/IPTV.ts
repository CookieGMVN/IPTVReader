import Downloader from "./utils/Downloader";
import Reader from "./utils/Reader";
import Server from "./Server";
import fs from "fs";

class IPTV {
    public start() {
        if (process.argv.length < 3) return console.error("UsageError: Missing flags. Please use with --read, --web, --download <url>")
        else {
            if (process.argv[2] == "--download") {
                if (process.argv.length < 4) {
                    console.log("Missing URL to download. Using default URL...");
                    Downloader.download("https://raw.githubusercontent.com/nzkfld-iptv/iptv/main/index.m3u");
                }
                else {
                    const url = process.argv[3];
                    if (!url.startsWith("https://")) {
                        console.log("UsageError: URL must be a string begin with HTTPS");
                    }
                    else {
                        Downloader.download(url);
                    }
                }
            }
            if (process.argv[2] == "--web") {
                console.log("Starting Server...");
                if (!fs.existsSync("list.m3u")) {
                    console.log("Playlist not found. The web will run without your channels.");
                }
                Server.start();
            }
            if (process.argv[2] == "--read") {
                console.log("CAUTION: THIS IS A FUNCTION FOR TESTING. PLEASE USE --web TO LAUNCH WEB APPLICATION!");
                Reader.read();
            }
        }
    }
}

const Program = new IPTV;
Program.start();