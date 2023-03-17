import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { get } from 'http';
import { OleoService } from './shared/oleo.service/oleo.service';
import { Oleo } from './shared/oleo/oleo';

@Controller('oleos')
export class OleosController {
  constructor(private oleoService: OleoService) { }

  @Get()
  async getAll(): Promise<Oleo[]> {
    return this.oleoService.buscarTodos();
  }

  @Get(':id')
  async getBayId(@Param('id') id: string): Promise<Oleo> {
    return this.oleoService.buscarPorId(id);
  }

  @Post()
  async createOleo(@Body() oleo: Oleo): Promise<Oleo> {
    return this.oleoService.cadastrar(oleo);
  }

  @Put(':id')
  async updateOleo(@Param('id') id: string, @Body() oleo: Oleo): Promise<Oleo> {
    return this.oleoService.atualizar(id, oleo);
  }

  @Delete(':id')
  async deleteOleo(@Param('id') id: string) {
    return this.oleoService.excluir(id);
  }
}
