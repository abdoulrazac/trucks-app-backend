import { Module } from '@nestjs/common';
import { CategoryService } from './services/category.service';
import { CategoryAclService } from './services/category-acl.service';
import { CategoryController } from './controllers/category.controller';
import { JwtAuthStrategy } from "../auth/strategies/jwt-auth.strategy";
import {CategoryRepository} from "./repositories/category.repository";
import { SharedModule } from "../shared/shared.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Category } from "./entities/category.entity";
import { UserModule } from "../user/user.module";

@Module({
  imports: [
    SharedModule,
    TypeOrmModule.forFeature([Category]),
    UserModule
  ],
  providers: [
    CategoryService,
    JwtAuthStrategy,
    CategoryAclService,
    CategoryRepository
  ],
  controllers: [CategoryController],
  exports : [CategoryService]
})
export class CategoryModule {}
