import {KNOWN_COMMANDS} from "./constants";

export type KnownCommand = typeof KNOWN_COMMANDS[number];

export type CommandHandler = (args: string[]) => Promise<any>;
