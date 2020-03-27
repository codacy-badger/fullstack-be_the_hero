const generateUniqueId = require('../../src/utils/GenerateUniqueId');

describe('Generate Unique ID for NGO', () => {
    it('should generate an unique ID', () => {
        const id = generateUniqueId();

        expect(id).toHaveLength(8);
    });
});
