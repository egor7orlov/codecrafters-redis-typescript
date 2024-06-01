import {KnownCommand} from "./types";
import {COMMAND_HANDLERS, KNOWN_COMMANDS} from "./constants";
import {RedisProtocol} from "../redis-protocol";

export class Command {
    private constructor(
        public name: KnownCommand,
        public args: string[],
    ) {
    }

    /**
     * Parse a string input formatted according to Redis protocol into a Command instance.
     * Refer to https://redis.io/docs/latest/develop/reference/protocol-spec/ for more information.
     */
    static parse(input: string): Command {
        const [commandName, ...args]: string[] = RedisProtocol.parseArray(input);

        if (!KNOWN_COMMANDS.includes(commandName as KnownCommand)) {
            throw new Error(`Unknown command '${commandName}'`);
        }

        return new Command(commandName as KnownCommand, args);
    }

    async execute(): Promise<any> {
        const handler = COMMAND_HANDLERS[this.name];

        if (!handler) {
            throw new Error(`No handler for command: ${this.name}`);
        }

        return handler(this.args);
    }
}
