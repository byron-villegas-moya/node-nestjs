import { Test } from '@nestjs/testing';
import { InfoModule } from './info.module';

describe('InfoModule', () => {
    it('should compile the module', async () => {
        const module = await Test.createTestingModule({ imports: [InfoModule] }).compile();
        expect(module).toBeDefined();
    });
});