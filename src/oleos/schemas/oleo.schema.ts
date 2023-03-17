import * as mongoose from 'mongoose';
export const OleoSchema = new mongoose.Schema({
  nome: {
    type: String,
    default: ''
  },
  descricao: {
    type: String,
    default: ''
  },
  comoUsar: {
    type: String,
    default: ''
  },
  habilitado:{
    type: Boolean,
    default: true 
  }

});