/**
 * Parser that makes decode/encode operations according to Redis protocol.
 * Refer to https://redis.io/docs/latest/develop/reference/protocol-spec/ for more information.
 */
export class RedisProtocol {
    public static CRLF = "\r\n";

    public static NULL_STR = `$-1${RedisProtocol.CRLF}`;

    public static parseArray(input: string): string[] {
        const splitInput = input.toLowerCase().split(RedisProtocol.CRLF).filter(Boolean);
        const [arraySize, ...entries] = splitInput;

        return entries.reduce((acc, entry, index) => {
            if (index % 2 !== 0) {
                acc.push(entry);
            }

            return acc;
        }, [] as string[]);
    }

    public static encodeString(s: string): string {
        return `$${s.length}${RedisProtocol.CRLF}${s}${RedisProtocol.CRLF}`;
    }

    public static encodeSuccessfulResponse(s: string): string {
        return `+${s}${RedisProtocol.CRLF}`;
    }
}
