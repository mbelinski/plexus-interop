/**
 * Copyright 2017 Plexus Interop Deutsche Bank AG
 * SPDX-License-Identifier: Apache-2.0
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

export class Arrays {

    public static concatenateBuffers(first: ArrayBuffer, second: ArrayBuffer): ArrayBuffer {
        return Arrays.concatTypesArrays(
            new Uint8Array(first),
            new Uint8Array(second)
        ).buffer;
    }

    public static concatTypesArrays(first: Uint8Array, second: Uint8Array): Uint8Array {
        const full = new Uint8Array(first.length + second.length);
        full.set(first, 0);
        full.set(second, first.length);
        return full;
    }

    public static toArrayBuffer(typedArray: Uint8Array): ArrayBuffer {
        return new Uint8Array(typedArray).buffer;
    }

}

function concat<T>(x: T[], y: T[]): T[] {
    return x.concat(y);
}

export function flatMap<T, R>(f: (el: T) => R[], array: T[]): R[] {
    return array.map(f).reduce<R[]>(concat, []);
}

export function join<T, R, Y>(first: T[], second: R[], joinFn: (x: T, y: R) => Y, predicate: (x: T, y: R) => boolean = () => true): Y[] {
    const result: Y[] = [];
    first.forEach(x => second.forEach(y => {
        if (predicate(x, y)) {
            result.push(joinFn(x, y));
        }
    }));
    return result;
}

export function distinct<T>(array: T[], key: (x: T) => any): T[] {
    const seen = new Set();
    return array.filter(item => {
        const k = key(item);
        return seen.has(k) ? false : seen.add(k);
    });
}