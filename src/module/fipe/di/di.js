import { axiosInstance } from '@/core/axios'
import { FipeController } from '../controller/fipeController'
import { buscaMarcaRepository } from '../data/repository/buscaMarcaRepository'
import { buscaMarcaUsecase } from '../domain/usecase/buscaMarcaUsecase'
import { buscaModeloRepository } from '../data/repository/buscaModeloRepository'
import { buscaModeloUsecase } from '../domain/usecase/buscaModeloUsecase'
import { buscaAnoRepository } from '../data/repository/buscaAnoRepository'
import { buscaAnoUsecase } from '../domain/usecase/buscaAnoUsecase'
import { buscaValorRepository } from '../data/repository/buscaValorRepository'
import { buscaValorUsecase } from '../domain/usecase/buscaValorUsecase'


const buscaMarcaRepositoryImpl = buscaMarcaRepository(axiosInstance)
const buscaMarcaUsecaseImpl = buscaMarcaUsecase(
  buscaMarcaRepositoryImpl
)

const buscaModeloRepositoryImpl = buscaModeloRepository(axiosInstance)
const buscaModeloUsecaseImpl = buscaModeloUsecase(
  buscaModeloRepositoryImpl
)

const buscaAnoRepositoryImpl = buscaAnoRepository(axiosInstance)
const buscaAnoUsecaseImpl = buscaAnoUsecase(
  buscaAnoRepositoryImpl
)

const buscaValorRepositoryImpl = buscaValorRepository(axiosInstance)
const buscaValorUsecaseImpl = buscaValorUsecase(
  buscaValorRepositoryImpl
)

const fipeController = (context) =>
  new FipeController(
    context,
    buscaMarcaUsecaseImpl,
    buscaModeloUsecaseImpl,
    buscaAnoUsecaseImpl,
    buscaValorUsecaseImpl
)

export { fipeController }
