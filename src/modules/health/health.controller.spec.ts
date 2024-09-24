import { HttpService } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { TerminusModule } from '@nestjs/terminus';
import { Test, TestingModule } from '@nestjs/testing';
import { HealthController } from './health.controller';

describe('HealthController', () => {
    let controller: HealthController;
    let httpService: HttpService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
                ConfigModule.forRoot({
                    ignoreEnvVars: true,
                    ignoreEnvFile: true
                }),
                ConfigModule,
                TerminusModule
            ],
            controllers: [HealthController],
            providers: [
                {
                    provide: HttpService,
                    useValue: {
                        get: jest.fn().mockResolvedValue('some result')
                    }
                }
            ]
        }).compile();

        controller = module.get<HealthController>(HealthController);
        httpService = module.get<HttpService>(HttpService);
    });

    describe('check', () => {
        it('should return an health object', async () => {
            const result = { 'details': { 'RSS': { 'status': 'up' }, 'heap': { 'status': 'up' } }, 'error': {}, 'info': { 'RSS': { 'status': 'up' }, 'heap': { 'status': 'up' } }, 'status': 'ok' };

            await expect(controller.check()).resolves.toStrictEqual(result);
        });
    });
    describe('check with diferent storage path', () => {
        it('should return an health object', async () => {
            const result = { 'details': { 'RSS': { 'status': 'up' }, 'heap': { 'status': 'up' } }, 'error': {}, 'info': { 'RSS': { 'status': 'up' }, 'heap': { 'status': 'up' } }, 'status': 'ok' };

            process.execPath = 'D:\\abc';

            await expect(controller.check()).resolves.toStrictEqual(result);
        });
    });
});
