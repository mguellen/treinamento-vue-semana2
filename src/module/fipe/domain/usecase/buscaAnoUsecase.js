const buscaAnoUsecase = (repository) => async (tipo, modelo, ano) => {
    try {
      //manipular a paginacao
      return await repository(tipo, modelo, ano)
    } catch (error) {
      throw error
    }
  }
  
  export { buscaAnoUsecase }
  