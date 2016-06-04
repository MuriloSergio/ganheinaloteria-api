'use strict';
var jsdom = require('jsdom');

const url = "http://www1.caixa.gov.br/loterias/loterias/quina/quina_pesquisa_new.asp";
const query = "?submeteu=sim&opcao=concurso&txtConcurso=";

module.exports = {
    ultimoResultado: function (req, res, next) {

        jsdom.env(
            url,
            ["http://code.jquery.com/jquery.js"],
            function (err, window) {
                var dezenas = [];
                window.$("ul li").each(function () { dezenas.push(window.$(this).text()) });

                var html = window.$("html").text().split("|");


                if (html.length < 4) {
                    return res.status(404).json({ error: "Resultado não encontrado" });
                }

                var retorno = {
                    numero: html[0],
                    data: html[16],
                    cidade: html[2] + '/' + html[3],
                    local: html[4],
                    valorAcumulado: html[13],
                    dezenas: dezenas.slice(5, 10),
                    premiacao: {
                        quina: {
                            ganhadores: html[6],
                            valorPago: html[7]
                        },
                        quadra: {
                            ganhadores: html[8],
                            valorPago: html[9]
                        },
                        terno: {
                            ganhadores: html[10],
                            valorPago: html[11]
                        },
                        duque: {
                            ganhadores: html[23],
                            valorPago: html[22]
                        }
                    },
                    arrecadacaoTotal: html[20],
                    proximoConcurso: {
                        data: html[18],
                        valorEstimado: html[17],
                    },
                    valorAcumuladoQuinaSaoJoao: html[21]
                };

                res.json(retorno);
            }
        );
    },

    resultadoDoConcurso: function (req, res, next) {
        var concurso = req.params.concurso;

        jsdom.env(
            url + query + concurso,
            ["http://code.jquery.com/jquery.js"],
            function (err, window) {
                var dezenas = [];
                window.$("ul li").each(function () { dezenas.push(window.$(this).text()) });

               var html = window.$("html").text().split("|");

                if (html.length < 4) {
                    return res.status(404).json({ error: "Resultado não encontrado" });
                }


                var retorno = {
                    numero: html[0],
                    data: html[16],
                    cidade: html[2] + '/' + html[3],
                    local: html[4],
                    valorAcumulado: html[13],
                    dezenas: dezenas.slice(5, 10),
                    premiacao: {
                        quina: {
                            ganhadores: html[6],
                            valorPago: html[7]
                        },
                        quadra: {
                            ganhadores: html[8],
                            valorPago: html[9]
                        },
                        terno: {
                            ganhadores: html[10],
                            valorPago: html[11]
                        },
                        duque: {
                            ganhadores: html[23],
                            valorPago: html[22]
                        }
                    },
                    arrecadacaoTotal: html[20],
                    proximoConcurso: {
                        data: html[18],
                        valorEstimado: html[17],
                    },
                    valorAcumuladoQuinaSaoJoao: html[21]
                };

                res.json(retorno);
            }
        );
    }
}
