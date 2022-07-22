import * as https from "https";
import * as fs from "fs";

export default class Downloader {
    public static async download(url: string) {
        const file = fs.createWriteStream(__dirname + "/../list.m3u");
        const req = https.get(url, function(res) {
            res.pipe(file);

            file.on("finish", () => {
                file.close();
                console.log("Download completed. Please use `npm start --web` to run player!");
            })
        });
        
    }
}