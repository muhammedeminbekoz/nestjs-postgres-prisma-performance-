import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
//import { useApitally } from 'apitally/nestjs';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  /*   useApitally(app, {
    clientId: '4b529c2b-74ba-4c18-8ffd-17b98d0f0138',
  });
 */
  await app.listen(1903);
}
bootstrap();
