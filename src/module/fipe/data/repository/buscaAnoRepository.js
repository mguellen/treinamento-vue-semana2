import { ano } from "../../domain/model/ano"

const buscaAnoRepository = (axios) => async (tipo, modelo, marca) => {
  try {
    const response = await axios.get('/fipe/api/v1/' + tipo + '/marcas/' + modelo + '/modelos/' + marca + '/anos')
    return response?.data?.map((anos) => new ano(anos)) ?? []
  } catch (error) {
    throw error
  }
}

export { buscaAnoRepository }
