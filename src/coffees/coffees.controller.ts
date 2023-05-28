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
} from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';
import { CoffeesService } from './coffees.service';
import { CreateCoffeeDto } from './dto/create-coffee.dto';

@Controller('coffees')
export class CoffeesController {
  constructor(
    private readonly _coffeesService: CoffeesService,
    @Inject(REQUEST) request: Request,
  ) {}

  @Get()
  findAll(@Query() paginationQuery: PaginationQueryDto) {
    return this._coffeesService.findAll(paginationQuery);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
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
