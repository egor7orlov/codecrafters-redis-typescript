import {KnownCommand} from "./types";
import {COMMAND_HANDLERS, KNOWN_COMMANDS, CRLF} from "./constants";

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
    static parse(input: string): Command | undefined {
        const splitInput = input.toLowerCase().split(CRLF).filter(Boolean);
        const [arraySize, ...entries] = splitInput;
        const [commandName, ...args]: string[] = entries.reduce((acc, entry, index) => {
            if (index % 2 !== 0) {
                acc.push(entry);
            }

            return acc;
        }, [] as string[]);

        if (!KNOWN_COMMANDS.includes(commandName as KnownCommand)) {
            return;
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
