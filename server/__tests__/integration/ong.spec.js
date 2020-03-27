import app from '../../src/app';

const request = require('supertest');

describe('NGO', () => {
    it('should be able to create a new NGO', async () => {
        const response = await request(app)
            .post('/ongs')
            .send({
                name: 'Anezinha',
                email: 'contato@apad.com.br',
                whatsapp: '21900000000',
                city: 'São Gonçalo',
                uf: 'RJ',
            });

        expect(response.body).toHaveProperty('id');
        expect(response.body.id).toHaveLength(8);
    });
});
