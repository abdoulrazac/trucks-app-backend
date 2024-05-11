import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";

import { JwtAuthStrategy } from "../auth/strategies/jwt-auth.strategy";
import { SharedModule } from "../shared/shared.module";
import { UserModule } from "../user/user.module";
import { RouteController } from './controllers/route.controller';
import { Route } from "./entities/route.entity";
import {RouteRepository} from "./repositories/route.repository";
import { RouteService } from './services/route.service';
import { RouteAclService } from './services/route-acl.service';

@Module({
  imports: [
    SharedModule,
    TypeOrmModule.forFeature([Route]),
    UserModule,
  ],
  providers: [
    RouteService,
    JwtAuthStrategy,
    RouteAclService,
    RouteRepository
  ],
  controllers: [RouteController],
  exports : [RouteService]
})
export class RouteModule {}
