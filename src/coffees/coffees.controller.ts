import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Inject,
  Param,
  Post,
  Query,
  SetMetadata,
} from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { Protocol } from 'src/common/decorators/protocol.decorator';
import { Public } from 'src/common/decorators/public.decorator';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';
import { ParseIntPipe } from 'src/common/pipes/parse-int.pipe';
import { CoffeesService } from './coffees.service';
import { CreateCoffeeDto } from './dto/create-coffee.dto';

@Controller('coffees')
export class CoffeesController {
  constructor(
    private readonly _coffeesService: CoffeesService,
    @Inject(REQUEST) request: Request,
  ) {}

  @Public()
  @Get()
  async findAll(
    @Protocol() protocol: string,
    @Query() paginationQuery: PaginationQueryDto,
  ) {
    // await new Promise((resolve) => setTimeout(resolve, 5000));
    console.log(protocol);

    return this._coffeesService.findAll(paginationQuery);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: string) {
    console.log('Oppps ', id);
    const coffee = this._coffeesService.findOne(id);

    if (!coffee)
      throw new HttpException(`Coffee #${id} not found`, HttpStatus.NOT_FOUND);

    return coffee;
  }

  @HttpCode(HttpStatus.CREATED)
  @Post()
  createOne(@Body() body: CreateCoffeeDto) {
    this._coffeesService.create(body);
  }
}
