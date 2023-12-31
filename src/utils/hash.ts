const bufferToHex = (buffer:ArrayBuffer): string => {
    const view = new DataView(buffer);

    let hexCodes = '';
    for (let index = 0; index < view.byteLength; index += 4) {
        hexCodes += view.getUint32(index).toString(16).padStart(8, '0');
    }

    return hexCodes;
};

const create = (algorithm: AlgorithmIdentifier) => async (buffer: string | ArrayBuffer) => {
    if (typeof buffer === 'string') {
        buffer = new globalThis.TextEncoder().encode(buffer);
    }

    const hash = await globalThis.crypto.subtle.digest(algorithm, buffer);

    return bufferToHex(hash);
};

export const sha1 = create('SHA-1');
export const sha256 = create('SHA-256');
export const sha384 = create('SHA-384');
export const sha512 = create('SHA-512');