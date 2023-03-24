/* eslint-disable prettier/prettier */
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  HttpException,
  HttpStatus,
  NotFoundException,
} from '@nestjs/common';
import { get } from 'http';
import { OleoService } from '../services/oleo.service';
import { Oleo } from '../oleo/oleo';
import { CreateOleoDTO } from '../DTO/create-oleo.dto';
import { UpdateOleoDTO } from '../DTO/update-oleo.dto';

@Controller('oleos')
export class OleosController {
  constructor(private oleoService: OleoService) { }

  @Get()
  async getAll(): Promise<Oleo[]> {
    try {
      return await this.oleoService.buscarTodos();
    } catch (error) {
      throw new HttpException({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        error: 'Erro ao buscar os Óleos!',
      },
        HttpStatus.INTERNAL_SERVER_ERROR,
        {
          cause: error,
        });
    }
  }

  @Get(':id')
  async getBayId(@Param('id') id: string): Promise<Oleo> {
    try {
      const oleoEncontrado = await this.oleoService.buscarPorId(id);
      return oleoEncontrado;
    } catch (error) {
      throw new HttpException({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        error: 'Óleo não encontrado',
      }, HttpStatus.INTERNAL_SERVER_ERROR, {
        cause: error
      });
    }
  }

  @Post()
  async createOleo(@Body() oleo: CreateOleoDTO) {
    try {
      return await this.oleoService.cadastrar(oleo);
    } catch (err) {
      throw new HttpException({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        error: 'Erro ao cadastrar Óleo.'
      }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Put(':id')
  async updateOleo(@Param('id') id: string, @Body() oleo: UpdateOleoDTO) {

    try {
      const oleoEncontrado = await this.oleoService.atualizar(id, oleo);

      if (!oleoEncontrado) {
        throw new NotFoundException(`Óleo não encontrado!`);
      }

      return oleoEncontrado;

    } catch (err) {
      if (err instanceof NotFoundException) {
        throw new HttpException({
          status: HttpStatus.NOT_FOUND,
          error: err.message,
        },
          HttpStatus.NOT_FOUND,
        );
      }
      throw new HttpException({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        error: 'Não foi possivel atualizar o Óleo.',
      },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Delete(':id')
  async deleteOleo(@Param('id') id: string) {
    // return this.oleoService.excluir(id);
    try {
      const oleoEncontrado = await this.oleoService.excluir(id);
      if (!oleoEncontrado) {
        throw new NotFoundException(`Óleo não encontrado!`);
      }
      return oleoEncontrado;
    } catch (err) {
      if (err instanceof NotFoundException) {
        throw new HttpException({
          status: HttpStatus.NOT_FOUND,
          error: err.message,
        },
          HttpStatus.NOT_FOUND,
        );
      }
      throw new HttpException({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        error: 'Não foi possivel excluir o Óleo!.',
      },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
