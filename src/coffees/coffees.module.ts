import { ConfigModule } from '@nestjs/config';
import { Module, Injectable } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm/dist';
import { Event } from 'src/event/entities/event.entity';
import { CoffeesController } from './coffees.controller';
import { CoffeesService } from './coffees.service';
import { Coffee } from './entities/coffee.entity';
import { Flavor } from './entities/flavor.entity';
import coffeeConfig from './config/coffee.config';

class ConfigService {}
class DevelopmentConfigService {}
class ProductionConfigService {}

@Injectable()
export class CoffeeBrandsFactory {
  create() {
    return ['some string'];
  }
}

@Module({
  imports: [
    TypeOrmModule.forFeature([Coffee, Flavor, Event]),
    ConfigModule.forFeature(coffeeConfig),
  ],
  controllers: [CoffeesController],
  providers: [
    CoffeesService,
    ConfigService,
    CoffeeBrandsFactory,
    // { provide: 'COFFEE_BRAND', useValue: ['Some string'] },
    {
      provide: 'COFFEE_BRAND',
      useFactory: (brandsFactory: CoffeeBrandsFactory) =>
        brandsFactory.create(),
      inject: [CoffeeBrandsFactory],
    },
    // {
    //   provide: ConfigService,
    //   useClass:
    //     process.env.NODE_ENV === 'development'
    //       ? DevelopmentConfigService
    //       : ProductionConfigService,
    // },
  ],
})
export class CoffeesModule {}
