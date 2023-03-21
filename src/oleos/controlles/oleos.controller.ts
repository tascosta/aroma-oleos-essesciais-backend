import { Body, Controller, Delete, Get, Param, Post, Put, HttpException, HttpStatus, NotFoundException } from '@nestjs/common';
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
          status: HttpStatus.NOT_FOUND,
          error: 'Óleo não encontrado! ' + error.message,
        },
        HttpStatus.NOT_FOUND,
        {
          cause: new Error(),
          description: 'Óleo não encontrado!'
        });
    }
  }

  @Post()
  async createOleo(@Body() oleo: CreateOleoDTO) {
    try {
      return this.oleoService.cadastrar(oleo);
    } catch (error) {
      throw new HttpException({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        error: 'Erro ao cadastrar o Óleo: ' + error.message,
      },
        HttpStatus.INTERNAL_SERVER_ERROR,
        {
          cause: error,
        });
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
    } catch (error) {
      throw new HttpException({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        error: 'Erro ao cadastrar o Óleo: ' + error.message,
      },
        HttpStatus.INTERNAL_SERVER_ERROR,
        {
          cause: new Error(),
          description: 'Erro ao cadastrar o Óleo'
        });
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
    } catch (error) {
      throw new HttpException({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        error: 'Erro ao excluir o Óleo: ' + error.message,
      },
        HttpStatus.INTERNAL_SERVER_ERROR,
        {
          cause: new Error(),
          description: 'Erro ao excluir o Óleo'
        });
    }
  }
}
