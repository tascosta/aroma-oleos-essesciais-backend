/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { Oleo } from '../oleo/oleo';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose'
import { exec } from 'child_process';
import { CreateOleoDTO } from '../DTO/create-oleo.dto';
import { UpdateOleoDTO } from '../DTO/update-oleo.dto';

@Injectable()
export class OleoService {
  constructor(@InjectModel('Oleo') private readonly oleoModelo: Model<Oleo>) {}

  async buscarTodos() {
    return await this.oleoModelo.find({}).exec();
  }

  async buscarPorId(id: string) {
    return await this.oleoModelo.findById(id).exec();
  }

  async cadastrar(oleo: CreateOleoDTO) {
    return await this.oleoModelo.create(oleo);
  }

  async atualizar(id: string, oleo: UpdateOleoDTO) {
    return await this.oleoModelo.updateOne({ _id: id }, oleo).exec();
  }

  async excluir(id: string) {
    return await this.oleoModelo.deleteOne({ _id: id }).exec();
  }
}
