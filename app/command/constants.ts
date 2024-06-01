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
    "set": async ([key, value]: string[]) => {
        storage.set(key, value);

        return RedisProtocol.encodeSuccessfulResponse("OK");
    },
    "get": async ([key]: string[]) => {
        const value = storage.get(key);

        if (!value) {
            return RedisProtocol.NULL_RESPONSE;
        }

        return RedisProtocol.encodeString(value);
    },
};
