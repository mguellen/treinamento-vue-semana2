const buscaMarcaUsecase = (repository) => async (tipo) => {
    try {
      //manipular a paginacao
  
      return await repository(tipo)
    } catch (error) {
      throw error
    }
  }
  
  export { buscaMarcaUsecase }
  