import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { RecipeModule } from './recipe/recipe.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';


@Module({
  imports: [ConfigModule.forRoot({envFilePath:"./.development.env"}),PrismaModule, RecipeModule, AuthModule, UsersModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
