import { fipe } from '../domain/model/fipe'
import * as echarts from 'echarts';

class FipeController {

  enOpcaoTipo = {
    1: 'carros',
    2: 'motos',
    3: 'caminhoes'
  }

  itemsString = []
  itemsModelo = []
  itemsAno = []
  itemsValor = []
  dadosGrafico = []

  acao = null
  modelo = null
  marca = null
  titulo = "Dados da Consulta"
  dialog = false

  constructor(context,
    buscaMarcaUsecase,
    buscaModeloUsecase,
    buscaAnoUsecase,
    buscaValorUsecase) {
    this.context = context
    this.buscaMarcaUsecase = buscaMarcaUsecase
    this.buscaModeloUsecase = buscaModeloUsecase
    this.buscaAnoUsecase = buscaAnoUsecase
    this.buscaValorUsecase = buscaValorUsecase
  }

  async buscar(acao) {

    this.acao = acao

    switch (acao) {
      case 1:
        this.titulo = "Consulta de Carro"
        break;
      case 2:
        this.titulo = "Consulta de Motos"
        break;
      case 3:
        this.titulo = "Consulta de Caminhão"
        break;
    }

    this.limparConsulta()
    this.itemsString = await this.buscaMarcaUsecase(this.enOpcaoTipo[acao])
  }

  async buscaModelo(modelo) {
    this.itemsModelo = await this.buscaModeloUsecase(this.enOpcaoTipo[this.acao], modelo)
    this.modelo = modelo
  }

  async buscaAno(marca) {
    this.itemsAno = await this.buscaAnoUsecase(this.enOpcaoTipo[this.acao], this.modelo, marca)
    this.marca = marca

    const valor = 0

    for (var i = 0; i < this.itemsAno.length; i++) {

      this.valor = await this.buscaValorUsecase(this.enOpcaoTipo[this.acao], this.modelo, this.marca, this.itemsAno[i].codigo)

      this.dadosGrafico.push({
        ano: this.itemsAno[i].codigo,
        valor: this.valor.Valor
      });
    }
  }

  async buscaValor(ano) {
    this.itemsValor = await this.buscaValorUsecase(this.enOpcaoTipo[this.acao], this.modelo, this.marca, ano)
  }

  async limparConsulta() {
    this.itemsString = []
    this.itemsModelo = []
    this.itemsAno = []
    this.itemsValor = []

    this.modelo = null
    this.marca = null
  }

  async grafico() {

    setTimeout(() => {
      var chartDom = document.getElementById('chart');
      var myChart = echarts.init(chartDom);
      var option;

      debugger
      if (chartDom) {
        option = {
          grid: {
            left: 0,
            right: 0
          },
          xAxis: {
            type: 'category',
            data: this.dadosGrafico.map((grafico) => grafico.ano)
          },
          yAxis: {
            type: 'value',
            axisLabel: {
              formatter: function (value) {
                return value
                  .toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                  })
                  .replace('R$ ', '')
              },
            },
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'shadow',
            },
            formatter: function (params) {
              var tar = params[0]
              return (
                tar.name +
                '<br/> Valor: ' +
                tar.value.toLocaleString('pt-BR', {
                  style: 'currency',
                  currency: 'BRL',
                })
              )
            },
          },
          series: [
            {
              data: this.dadosGrafico.map((grafico) => {
                return {
                  value: parseFloat(
                    grafico.valor.replace('R$ ', '')
                      .split('.')
                      .join('')
                      .replace(',', '.')
                  ),
                  itemStyle: { color: 'red' },
                }
              }),
              type: 'bar',
            }
          ]
        };

        option && myChart.setOption(option);

      }
    },
      500);


  }

  /*
  async salvar() {
    try {
      if (this.form.rowid === null)
        await this.incluiContaUsecase(this.form)
      else
        await this.alteraContaUsecase(this.form)

      this.mounted()
      this.form = new wofi009({})
      this.dialogCrud = false

      snackbar.show({ message: 'Dados Salvos com Sucesso!', color: 'green'})

    } catch (error) {
      snackbar.show({ message: error.toString() })
    }
  }

  async alterar(conta) {
    try {
      
      this.form = await this.buscaContaDetalhadaUsecase(conta.rowid, "A")
      this.dialogCrud = true
        
    } catch (error) {
      snackbar.show({ message: error.toString() })
    }

  }

  async excluir(conta) {
    try {
      await this.deletaContaUsecase(conta)
    } catch (error) {
      snackbar.show({ message: error.toString() })
    }
  }
  */
}

export { FipeController }
