/* eslint-disable prettier/prettier */
import { IsString,IsNotEmpty} from 'class-validator';

export class CreateOleoDTO {

  @IsNotEmpty({
    message: 'O campo nome deve ser preenchido!',
  })
  @IsString({
    message: 'Insira um nome válido! ', 
  })
  nome: string;

  @IsNotEmpty({
    message: 'O campo descrição deve ser preenchido!',
  })
  @IsString({
    message: 'Insira uma descrição válido! ', 
  })
  descricao: string;

  @IsNotEmpty({
    message: 'O campo como usar deve ser preenchido!',
  })
  @IsString({
    message: 'Insira como usar válido! ', 
  })
  comoUsar: string;
}
