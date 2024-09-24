import { Test } from '@nestjs/testing';
import { AuthModule } from './auth.module';

describe('AuthModule', () => {
    it('should compile the module', async () => {
        const module = await Test.createTestingModule({ imports: [AuthModule] }).compile();
        expect(module).toBeDefined();
    });
});