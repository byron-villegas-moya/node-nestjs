import { Test } from '@nestjs/testing';
import { ProductoModule } from './producto.module';

describe('ProductoModule', () => {
    it('should compile the module', async () => {
        const module = await Test.createTestingModule({ imports: [ProductoModule] }).compile();
        expect(module).toBeDefined();
    });
});