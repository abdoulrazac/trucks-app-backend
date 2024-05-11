import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";

import { JwtAuthStrategy } from "../auth/strategies/jwt-auth.strategy";
import { SharedModule } from "../shared/shared.module";
import { UserModule } from "../user/user.module";
import { CategoryController } from './controllers/category.controller';
import { Category } from "./entities/category.entity";
import {CategoryRepository} from "./repositories/category.repository";
import { CategoryService } from './services/category.service';
import { CategoryAclService } from './services/category-acl.service';

@Module({
  imports: [
    SharedModule,
    TypeOrmModule.forFeature([Category]),
    UserModule,
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
