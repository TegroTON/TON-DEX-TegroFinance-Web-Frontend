import axios from "axios";
import * as t from 'io-ts';
import { isRight } from 'fp-ts/lib/Either';
import reporter from 'io-ts-reporters';


export class Endpoint<T> {
    private readonly url: string
    private readonly schema: t.Type<T>
    private readonly transformer: (x: T) => any
    private readonly timeout: number

    constructor(url: string, params: {
        schema: t.Type<T>,
        transformer: (x: T) => any,
        timeout?: number
    }) {
        this.url = url;
        this.schema = params.schema;
        this.timeout = params.timeout || 30000;
        this.transformer = params.transformer;
    }

    async get(params?: string[]) {
        const headers: Record<string, any> = {
            'Content-Type': 'application/json',
        };
        const url = params ? this.url + "/" + params.join("/") : this.url
        const res = await axios.get<T>(url, { headers, timeout: this.timeout, });
        if (res.status !== 200) {
            throw Error(`Received error: ${JSON.stringify(res.data)}`);
        }
        const decoded = this.schema.decode(res.data);
        if (isRight(decoded)) {
            return this.transformer(decoded.right);
        }
        throw Error(`Malformed response: ${reporter.report(decoded).join(', ')}`);
    }
}
