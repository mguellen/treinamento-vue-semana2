<template>
  <v-app>
    <v-main>
      <div>
        <v-app-bar
          class="white--text"
          color="green"
          app
          clipped-left
          clipped-right
        >
          <v-spacer> </v-spacer>
          Consulta FIPE
          <v-spacer> </v-spacer>
        </v-app-bar>

        <v-container>
          <v-row dense>
            <v-col v-for="card in cards" :key="card.title">
              <v-card
                :color="card.color"
                class="ma-1"
                @click="controller.buscar(card.acao)"
              >
                <div class="d-flex flex-no-wrap justify-space-between">
                  <div>
                    <v-card-title
                      class="headline"
                      v-text="card.title"
                      style="
                        color: white;
                        word-break: break-word;
                        text-align: initial;
                      "
                    ></v-card-title>
                  </div>

                  <v-avatar class="ma-3" size="125" tile>
                    <v-icon size="128" color="white">
                      {{ card.icone }}
                    </v-icon>
                  </v-avatar>
                </div>
              </v-card>
            </v-col>
          </v-row>
        </v-container>

        <v-container class="fill-height">
          <v-row justify="center" align="center">
            <v-col xl="5" lg="4">
              <v-card elevation="9">
                <v-card-title> {{ controller.titulo }} </v-card-title>

                <v-divider />

                <v-card-text>
                  <v-select
                    color="green"
                    outlined
                    dense
                    :items="controller.itemsString"
                    item-text="nome"
                    item-value="codigo"
                    label="Selecione a Marca do Veículo"
                    @change="controller.buscaModelo($event)"
                  >
                  </v-select>

                  <v-select
                    color="green"
                    outlined
                    dense
                    :items="controller.itemsModelo"
                    item-text="nome"
                    item-value="codigo"
                    label="Selecione o Modelo do Veículo"
                    @change="controller.buscaAno($event)"
                  >
                  </v-select>

                  <v-select
                    color="green"
                    outlined
                    dense
                    :items="controller.itemsAno"
                    item-text="nome"
                    item-value="codigo"
                    label="Selecione o Ano do Veículo"
                    @change="controller.buscaValor($event)"
                  >
                  </v-select>
                </v-card-text>

                <v-card-text class="font-weight-black"
                  >Mês de Referência: {{ controller.itemsValor.MesReferencia }}
                </v-card-text>
                <v-divider></v-divider>

                <v-card-text class="font-weight-black"
                  >Código Fipe: {{ controller.itemsValor.CodigoFipe }}
                </v-card-text>
                <v-divider></v-divider>

                <v-card-text class="font-weight-black"
                  >Valor: {{ controller.itemsValor.Valor }}
                </v-card-text>

                <v-divider></v-divider>

                <v-card-actions>
                  <v-btn
                    color="green"
                    style="
                      color: white;
                      word-break: break-word;
                      text-align: initial;
                    "
                    @click="controller.limparConsulta()"
                  >
                    Limpar Consulta
                  </v-btn>

                  <v-spacer> </v-spacer>
                  <div class="text-center">
                    <v-dialog v-model="controller.dialog" width="500">
                      <template v-slot:activator="{ on, attrs }">
                        <v-btn
                          v-bind="attrs"
                          v-on="on"
                          color="green"
                          style="
                            color: white;
                            word-break: break-word;
                            text-align: initial;
                          "
                          @click="controller.grafico()"
                        >
                          Gráfico
                        </v-btn>
                      </template>

                      <v-card>
                        <v-card-title class="text-h5 grey lighten-2">
                          Evolução Anual de Valores
                        </v-card-title>

                        <v-card-text>
                          <div
                            id="chart"
                            style="height: 70vh; width: 100%">
                          </div>
                        </v-card-text>

                        <v-divider></v-divider>

                        <v-card-actions>
                          <v-spacer></v-spacer>
                          <v-btn color="green" text @click="controller.dialog = false">
                            OK
                          </v-btn>
                        </v-card-actions>

                      </v-card>
                    </v-dialog>
                  </div>

                </v-card-actions>
              </v-card>
            </v-col>
          </v-row>
        </v-container>

        <v-footer height="40" app color="green"></v-footer>
      </div>
    </v-main>
  </v-app>
</template>

<script>
import { fipeController } from "../di/di";

export default {
  data: (context) => ({
    controller: fipeController(context),
    cards: [
      {
        title: "Carro",
        color: "green",
        icone: "mdi-car",
        acao: 1,
      },
      {
        title: "Moto",
        color: "green",
        icone: "mdi-motorbike",
        acao: 2,
      },
      {
        title: "Caminhão",
        color: "green",
        icone: "mdi-truck-fast",
        acao: 3,
      },
    ],
  }),
  /*,
  methods: {
    async buscar(acao) {
      alert(acao);
    },
  },*/
};
</script>
