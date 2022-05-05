import { valor } from "../../domain/model/valor"

const buscaValorRepository = (axios) => async (tipo, modelo, marca, ano) => {
  try {
    const response = await axios.get('/fipe/api/v1/' + tipo + '/marcas/' + modelo + '/modelos/' + marca + '/anos/' + ano)
    return new valor(response.data)
  } catch (error) {
    throw error
  }
}

export { buscaValorRepository }
