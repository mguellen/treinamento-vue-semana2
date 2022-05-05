const buscaValorUsecase = (repository) => async (tipo,marca, modelo, ano) => {
    try {
      //manipular a paginacao
      return await repository(tipo, marca, modelo, ano)
    } catch (error) {
      throw error
    }
  }
  
  export { buscaValorUsecase }
  