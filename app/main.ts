import "./storage";
import * as net from "net";
import {Command} from "./command";
import {Command as ProgramArgs} from "commander";

const programArgs = new ProgramArgs();

programArgs
    .option("-p, --port <number>", "Port to listen to", "6379")
    .parse(process.argv);

const server: net.Server = net.createServer((connection: net.Socket) => {
    connection.on("data", async (data: Buffer) => {
        try {
            const command = Command.parse(data.toString().trim());
            const result = await command.execute();

            connection.write(result);
        } catch (error: unknown) {
            connection.write(`-ERR ${(error as Error).message}\r\n`);
            return;
        }
    });
});

server.listen(+programArgs.opts().port, "127.0.0.1");
