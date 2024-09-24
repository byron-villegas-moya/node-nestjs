import { Test } from '@nestjs/testing';
import { HealthModule } from './health.module';

describe('HealthModule', () => {
    it('should compile the module', async () => {
        const module = await Test.createTestingModule({ imports: [HealthModule] }).compile();
        expect(module).toBeDefined();
    });
});