import { PORT } from './config/constants';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(PORT).then(() => {
    console.log(`==> app started using port ${PORT}`);
  });
}
bootstrap();
