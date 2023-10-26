import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: '*',
  });
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );
  const config = new DocumentBuilder()
    .setTitle('ImpostoAPI')
    .setDescription(
      'API de imposto desenvolvida como atividade da tarefa de PW-III',
    )
    .setVersion('1.0')
    .addServer('http://localhost:3000')
    .setContact('Wiliam Melo', '', 'Wiiliammelo.mota@gmail.com')
    .setLicense(
      'MIT',
      'https://github.com/WiliamMelo01/impostoApi/blob/master/LICENSE',
    )
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('doc', app, document);

  await app.listen(3000);
}
bootstrap();
