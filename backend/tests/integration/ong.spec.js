const request = require('supertest'); 
const app = require('../../src/app'); 
const connection = require('../../src/database/connection');

describe('ONG', () => {
    beforeEach(async () => {
        await connection.migrate.rollback();
        await connection.migrate.latest();
    });

    it('should be able to create a new ONG', async () => {
        const response = await request(app).post('/ong').send({
            name: "APAE",
            email: "apae@apae.com.br",
            whatsapp: "24999586678",
            city: "Niteroi",
            uf: "SP"
        });
        expect(response.body).toHaveProperty('id');
        expect(response.body.id).toHaveLength(8);

    });

    afterAll(async () => {
        await connection.destroy();
    })
})