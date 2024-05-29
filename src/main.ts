import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());

  // Use DocumentBuilder to create a new Swagger document configuration
  const config = new DocumentBuilder()
    .setTitle('Recipe')
    .setDescription('Recipe Api')
    .setVersion('0.1')
    .build()

  // Create a Swagger document using the application instance and the document configuration
  const document = SwaggerModule.createDocument(app, config)

  // Setup Swagger module with the application instance and the Swagger document
  SwaggerModule.setup('/', app, document)

  await app.listen(3000);
}
bootstrap();
