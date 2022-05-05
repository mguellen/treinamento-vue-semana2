import { modelo } from "../../domain/model/modelo"

const buscaModeloRepository = (axios) => async (tipo, marca) => {
  try {
    const response = await axios.get('/fipe/api/v1/' + tipo + '/marcas/' + marca + '/modelos')
    return response?.data?.modelos?.map((modelos) => new modelo(modelos)) ?? []
  } catch (error) {
    throw error
  }
}

export { buscaModeloRepository }
