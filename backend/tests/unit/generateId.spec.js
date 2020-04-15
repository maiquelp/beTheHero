const generateId = require('../../src/utils/generateId');

describe('Generate unique id', () => {
    it('should generate an unique id with 8 chars', () => {
        const id =generateId();
        
        expect(id).toHaveLength(8)
    })
})