import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { VersioningType } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable global API versioning
  app.enableVersioning({
    type: VersioningType.URI, // e.g /v1/
  });

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
