import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { HealthController } from './health/health.controller';
import { HealthService } from './health/health.service';
import { validate } from './env.validation';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      validate,
    }),
  ],
  controllers: [HealthController],
  providers: [HealthService],
})
export class AppModule {}
