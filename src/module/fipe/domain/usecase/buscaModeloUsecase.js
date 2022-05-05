const buscaModeloUsecase = (repository) => async (tipo, modelo) => {
    try {
      //manipular a paginacao
      return await repository(tipo, modelo)
    } catch (error) {
      throw error
    }
  }
  
  export { buscaModeloUsecase }
  