import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { getConnectionToken } from '@nestjs/mongoose';
import { Connection } from 'mongoose';

async function bootstrap() {
  const logger = new Logger('Bootstrap');

  const app = await NestFactory.create(AppModule);

  app.enableCors({ origin: 'http://localhost:3000' });

  app.useGlobalPipes(
    new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true, transform: true }),
  );

  const connection = app.get<Connection>(getConnectionToken());
  // readyState 1 = connected
  logger.log(
    `MongoDB connected: ${connection.host}:${connection.port}/${connection.name} (readyState=${connection.readyState})`,
  );
  connection.on('disconnected', () => logger.error('MongoDB disconnected'));
  connection.on('reconnected', () => logger.log('MongoDB reconnected'));

  const port = process.env.PORT ?? 4000;
  await app.listen(port);
  logger.log(`API listening on http://localhost:${port}`);
}

bootstrap().catch((err: unknown) => {
  const message = err instanceof Error ? err.message : String(err);
  new Logger('Bootstrap').error(`Startup failed: ${message}`);
  process.exit(1);
});