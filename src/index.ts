import {createHash} from 'crypto';
import {createReadStream} from 'fs';

type Options = {
    algorithm?: 'sha256'| 'sha384' | 'sha512' | string;
}

const FILE_ENCODING = 'utf8';

// 3.2 SRI
const DEFAULT_SIGNATURE_ALGORITHM = 'sha512';

// 3.3 SRI
const SRI_ENCODING = 'base64';

// 5.3 SRI, WSTG-CRYP-04
const WEAK_SIGNATURE_ALGORITHMS = [
    'bf', 'des', 'ecb', 'rc2',
    'rc4', 'md5', 'md4', 'sha1'
];

function generate(file: string, {
    algorithm = DEFAULT_SIGNATURE_ALGORITHM
}: Options = {}): Promise<string> {
    return new Promise((resolve, reject) => {
        const stream = createReadStream(file, {
            encoding: FILE_ENCODING
        });

        const hash = createHash(algorithm);

        if (WEAK_SIGNATURE_ALGORITHMS.includes(algorithm)) {
            const error = new Error(`Weak signature algorithm "${algorithm}" is not allowed`);

            return reject(error);
        }

        stream.on('error', reject);
        stream.on('data', data => hash.update(data));
        stream.on('end', () => {
            const integrity = `${algorithm}-${hash.digest(SRI_ENCODING)}`;

            resolve(integrity);
            hash.end();
        });
    });
}

export {generate};
