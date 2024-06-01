import {CommandHandler, KnownCommand} from "./types";

export const CRLF = '\r\n';

export const KNOWN_COMMANDS = ["echo", "ping"] as const;

export const COMMAND_HANDLERS: Record<KnownCommand, CommandHandler> = {
    "echo": async (args: string[]) => args.join(' '),
    "ping": async (args: string[]) => "PONG",
};
