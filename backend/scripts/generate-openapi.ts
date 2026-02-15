import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { writeFileSync, mkdirSync } from 'fs';
import { resolve } from 'path';
import { AppModule } from '../src/app.module';

async function generateOpenApi() {
  const app = await NestFactory.create(AppModule, { logger: false });
  app.setGlobalPrefix('api/v1');

  const config = new DocumentBuilder()
    .setTitle('RunCheck API')
    .setDescription('RunCheck Backend API')
    .setVersion('1.0.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);

  const jsonPath = resolve(__dirname, '../../openapi/api.json');
  mkdirSync(resolve(__dirname, '../../openapi'), { recursive: true });
  writeFileSync(jsonPath, JSON.stringify(document, null, 2));
  console.log(`OpenAPI spec generated at: ${jsonPath}`);

  await app.close();
}

generateOpenApi();
