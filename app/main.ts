import * as net from "net";
import {Command} from "./command";

const server: net.Server = net.createServer((connection: net.Socket) => {
    connection.on("data", async (data: Buffer) => {
        const input = data.toString().trim();
        const command = Command.parse(input);

        if (!command) {
            connection.write(`-ERR Unknown command\r\n`);
            return;
        }

        const result = await command.execute();

        connection.write(`+${result}\r\n`);
    });
});

server.listen(6379, "127.0.0.1");
