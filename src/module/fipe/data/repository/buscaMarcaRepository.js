import { fipe } from "../../domain/model/fipe"

const buscaMarcaRepository = (axios) => async (tipo) => {
  try {
    const response = await axios.get('/fipe/api/v1/' + tipo + '/marcas')
    return response?.data?.map((marca) => new fipe(marca)) ?? []
  } catch (error) {
    throw error
  }
}

export { buscaMarcaRepository }
