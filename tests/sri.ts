import * as assert from 'assert';
import {join} from 'path';
import {generate} from '../';

describe('SRI', () => {
    let file: string;

    beforeEach(() => {
        file = join(__dirname, './assets/file.txt');
    });

    it('Default options', async () => {
        const actual = await generate(file);

        assert.equal(actual, 'sha512-z4PhNX7vuL3xVChQ1m2AB9Yg5AULVxXcg/SpIdNs6c5H0NE8XYXysP+DGNKHfuwvY7kxvUdBeoGlODJ6+SfaPg==');
    });

    it('Algorithm option', async () => {
        const actual = await generate(file, {
            algorithm: 'sha256'
        });

        assert.equal(actual, 'sha256-47DEQpj8HBSa+/TImW+5JCeuQeRkm5NMpJWZG3hSuFU=');
    });

    it('Weak signature algorithm', async () => {
        const actual = async () => (
            await generate(file, {
                algorithm: 'md5'
            })
        );

        assert.rejects(actual, {
            message: 'Weak signature algorithm "md5" is not allowed'
        });
    });
});
