import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Habilitar CORS para permitir requisições do frontend
  app.enableCors({
    origin: 'http://localhost:5173', // URL do Vite dev server
    credentials: true,
  });

  await app.listen(3000);
  console.log('🦸 Nightwing API is running on http://localhost:3000');
}
bootstrap();