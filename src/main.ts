import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import fs from 'fs';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { json } from 'body-parser';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const options = {};
  if (process.env.SSL_KEY && process.env.SSL_CERTIFICATE) {
    options['httpsOptions'] = {
      key: fs.readFileSync(process.env.SSL_KEY),
      cert: fs.readFileSync(process.env.SSL_CERTIFICATE),
    };
  }
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn', 'debug', 'log'],
    bodyParser: false,
    ...options,
  });
  app.use(json({ limit: '50mb' }));

  const config = new DocumentBuilder().addBearerAuth().build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  const PORT = process.env.PORT || 1031;
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(PORT);
}
bootstrap();
