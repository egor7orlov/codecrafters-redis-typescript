import {CommandHandler, KnownCommand} from "./types";
import {storage} from "../storage";
import {RedisProtocol} from "../redis-protocol";

export const KNOWN_COMMANDS = ["echo", "ping", "set", "get"] as const;

export const COMMAND_HANDLERS: Record<KnownCommand, CommandHandler> = {
    "echo": async (args: string[]) => {
        return RedisProtocol.encodeSuccessfulResponse(args.join(' '));
    },
    "ping": async (args: string[]) => {
        return RedisProtocol.encodeSuccessfulResponse("PONG");
    },
    "set": async ([key, ...args]: string[]) => {
        const indexOfPx = args.indexOf("px");

        if (indexOfPx === -1) {
            storage.set(key, args.join(' '));
        } else {
            const value = args.slice(0, indexOfPx).join(' ');
            storage.set(key, value);

            const millis = parseInt(args[indexOfPx + 1]);
            storage.expireInMillis(key, millis);
        }

        return RedisProtocol.encodeSuccessfulResponse("OK");
    },
    "get": async ([key]: string[]) => {
        const value = storage.get(key);

        if (!value) {
            return RedisProtocol.NULL_STR;
        }

        return RedisProtocol.encodeString(value);
    },
};
