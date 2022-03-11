import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CustomInterseptor } from './custom.interseptor';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      // useClass: ClassSerializerInterceptor,
      useClass: CustomInterseptor,
    },
  ],
})
export class AppModule {}
