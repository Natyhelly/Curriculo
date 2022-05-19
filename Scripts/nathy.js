function alteraTextPaginaTab(text) {
    document.getElementById('textPaginaTab').innerText = text;
}

function mensagemNaFoto(mensagem) {
    alert(mensagem);
}

function calcular(operador, valor1, valor2) {
    if (operador == '/' && (valor1 == 0 || valor2 == 0)) {
        var resultado = 'Juvenil';
        return resultado;
    }

    if (operador == '+')
        var resultado = valor1 + valor2;
    else {
        if (operador == '-')
            var resultado = valor1 - valor2;
        else {
            if (operador == '*') {
                if (valor1.toString().substring(0, 2) == '0.' && valor2.toString().substring(0, 2) == '0.')
                    var resultado = (valor1 * valor2).toFixed(valor1.toString().length - 2 + valor2.toString().length - 2);
                else
                    var resultado = (valor1 * valor2);


            } else
                var resultado = (valor1 / valor2).toPrecision(13);

        }
    }
    return resultado.toString().replace('.', ',');
}


function montarCalculo(valor, tipo) { // Função para montar o cálculo na tab calculadora.

    var visor = document.getElementById('visor').innerText;
    var primeiroNumero = document.getElementById('primeiroNumero').innerText;
    var segundoNumero = document.getElementById('segundoNumero').innerText;
    var operador = document.getElementById('operador').innerText;
    var resultadoCalcular = '';
    var total = document.getElementById('total').innerText;

    // Limpa o visor e todos os campos escondidos.
    if (valor == 'C') {
        document.getElementById('visor').innerText = '0';
        document.getElementById('primeiroNumero').innerText = '';
        document.getElementById('segundoNumero').innerText = '';
        document.getElementById('operador').innerText = '';
        document.getElementById('total').innerText = '';
        return;
    }

    // Adiciona o primeiro número se não for 0.
    if (primeiroNumero == '') {
        if (tipo == 'numero' && valor != '0' && valor != ',') {
            document.getElementById('primeiroNumero').innerText = valor;
            document.getElementById('visor').innerText = valor;

        } else if (valor == ',') {
            document.getElementById('primeiroNumero').innerText += valor;
            document.getElementById('visor').innerText += valor;
        }
        return;
    }

    // Acrescenta outro número se o operador e o total estiver vazio. 
    if (operador == '') {
        if (tipo == 'numero') {
            if (total == '') { // Se não é pra reiniciar ainda...
                if ((valor == ',' && primeiroNumero.indexOf(',') == -1) || valor != ',') { // ... e já tiver vírgula, não põe outra.
                    document.getElementById('primeiroNumero').innerText += valor;
                    document.getElementById('visor').innerText += valor;
                }

                return;

            } else { // Se pode reiniciar, substitui pelo novo número (reinicializando a conta).
                document.getElementById('total').innerText = '';

                if (valor == ',') {
                    document.getElementById('primeiroNumero').innerText = 0 + valor;
                    document.getElementById('visor').innerText = 0 + valor;

                } else {
                    document.getElementById('primeiroNumero').innerText = valor;
                    document.getElementById('visor').innerText = valor;
                }
                return;
            }
        } else { // Se for operador, acrescenta ele no visor.
            if (valor !== '=') {
                document.getElementById('operador').innerText = valor;
                document.getElementById('visor').innerText += valor;
                return;
            }

        }
    } else { // Se já tiver operador
        if (tipo == 'numero') {

            if ((segundoNumero == '' && valor != ',') || segundoNumero != '') {
                if (!(segundoNumero == '0' && valor == '0')) { // Não adiciona mais de 1 zero.

                    if (segundoNumero == '0' && valor != ',') { // Substitui o zero por outro número na primeira casa do segundoNumero.
                        document.getElementById('segundoNumero').innerText = valor;
                        document.getElementById('visor').innerText = valor;
                    } else {
                        if ((valor == ',' && segundoNumero.indexOf(',') == -1) || valor != ',') { // se já tiver vírgula, não põe outra ou põe números.
                            document.getElementById('segundoNumero').innerText += valor;
                            document.getElementById('visor').innerText += valor;
                        }
                    }
                }
            } else {
                // ... ou adiciona "0," na primeira casa.
                document.getElementById('segundoNumero').innerText += 0 + valor;
                document.getElementById('visor').innerText += 0 + valor;
            }
            return;
        }
        if (segundoNumero == '') { // Se já tiver operador e vier outro operador, substitui o mesmo.
            if (valor == '=') {
                resultadoCalcular = calcular(operador, parseFloat(primeiroNumero.replace(',', '.')), parseFloat(primeiroNumero.replace(',', '.')));
                document.getElementById('primeiroNumero').innerText = resultadoCalcular;
                document.getElementById('visor').innerText = resultadoCalcular;
                document.getElementById('operador').innerText = '';
                document.getElementById('total').innerText = resultadoCalcular;
            } else {
                document.getElementById('operador').innerText = valor;
                document.getElementById('visor').innerText = visor.substring(0, visor.length - 1) + valor;
            }


        } else { // Se já tiver o segundo número, mostra o resultado e limpa o segundo número.
            resultadoCalcular = calcular(operador, parseFloat(primeiroNumero.replace(',', '.')), parseFloat(segundoNumero.replace(',', '.')));
            document.getElementById('primeiroNumero').innerText = resultadoCalcular;
            document.getElementById('segundoNumero').innerText = '';

            if (valor == '=') { // Se for o sinal de = , calcula a conta e limpa o operador.
                document.getElementById('visor').innerText = resultadoCalcular;
                document.getElementById('operador').innerText = '';
                document.getElementById('total').innerText = resultadoCalcular;
            } else { // Se não, mostra o resultado + o novo operador.
                document.getElementById('visor').innerText = resultadoCalcular + valor;
                document.getElementById('operador').innerText = valor;
            }
        }


    }


}

function jogoDaVelha(casa) {
    var proximoValor = document.querySelector('#proximoValor').value;

    //busca conteúdo da casa
    var conteudoCasa = document.getElementById(casa).innerText;

    //valida conteudo da casa 
    if (conteudoCasa == '') {
        document.querySelector('#casasPreenchidas').value += 1;
        document.getElementById(casa).innerText = proximoValor;

        if (proximoValor == 'X')
            document.querySelector('#proximoValor').value = 'O';
        else
            document.querySelector('#proximoValor').value = 'X';

        document.getElementById(casa).disabled = true;
    }

    var casa1 = document.getElementById('casa-1').innerText;
    var casa2 = document.getElementById('casa-2').innerText;
    var casa3 = document.getElementById('casa-3').innerText;
    var casa4 = document.getElementById('casa-4').innerText;
    var casa5 = document.getElementById('casa-5').innerText;
    var casa6 = document.getElementById('casa-6').innerText;
    var casa7 = document.getElementById('casa-7').innerText;
    var casa8 = document.getElementById('casa-8').innerText;
    var casa9 = document.getElementById('casa-9').innerText;

    if (casa1 == 'X' && casa2 == 'X' && casa3 == 'X')
        document.getElementById('msg-vencedor').innerText = 'X ganhou!!';
    else if (casa4 == 'X' && casa5 == 'X' && casa6 == 'X')
        document.getElementById('msg-vencedor').innerText = 'X ganhou!!';
    else if (casa7 == 'X' && casa8 == 'X' && casa9 == 'X')
        document.getElementById('msg-vencedor').innerText = 'X ganhou!!';
    else if (casa1 == 'X' && casa4 == 'X' && casa7 == 'X')
        document.getElementById('msg-vencedor').innerText = 'X ganhou!!';
    else if (casa2 == 'X' && casa5 == 'X' && casa8 == 'X')
        document.getElementById('msg-vencedor').innerText = 'X ganhou!!';
    else if (casa3 == 'X' && casa6 == 'X' && casa9 == 'X')
        document.getElementById('msg-vencedor').innerText = 'X ganhou!!';
    else if (casa1 == 'X' && casa5 == 'X' && casa9 == 'X')
        document.getElementById('msg-vencedor').innerText = 'X ganhou!!';
    else if (casa3 == 'X' && casa5 == 'X' && casa7 == 'X')
        document.getElementById('msg-vencedor').innerText = 'X ganhou!!';

    else if (casa1 == 'O' && casa2 == 'O' && casa3 == 'O')
        document.getElementById('msg-vencedor').innerText = 'O ganhou!!';
    else if (casa4 == 'O' && casa5 == 'O' && casa6 == 'O')
        document.getElementById('msg-vencedor').innerText = 'O ganhou!!';
    else if (casa7 == 'O' && casa8 == 'O' && casa9 == 'O')
        document.getElementById('msg-vencedor').innerText = 'O ganhou!!';
    else if (casa1 == 'O' && casa4 == 'O' && casa7 == 'O')
        document.getElementById('msg-vencedor').innerText = 'O ganhou!!';
    else if (casa2 == 'O' && casa5 == 'O' && casa8 == 'O')
        document.getElementById('msg-vencedor').innerText = 'O ganhou!!';
    else if (casa3 == 'O' && casa6 == 'O' && casa9 == 'O')
        document.getElementById('msg-vencedor').innerText = 'O ganhou!!';
    else if (casa1 == 'O' && casa5 == 'O' && casa9 == 'O')
        document.getElementById('msg-vencedor').innerText = 'O ganhou!!';
    else if (casa3 == 'O' && casa5 == 'O' && casa7 == 'O')
        document.getElementById('msg-vencedor').innerText = 'O ganhou!!';

    else if (document.querySelector('#casasPreenchidas').value.length == 9)
        document.getElementById('msg-vencedor').innerText = 'Game over :(';

    return;
}

function reiniciarJogo() {

    document.getElementById('casa-1').innerText = '';
    document.getElementById('casa-2').innerText = '';
    document.getElementById('casa-3').innerText = '';
    document.getElementById('casa-4').innerText = '';
    document.getElementById('casa-5').innerText = '';
    document.getElementById('casa-6').innerText = '';
    document.getElementById('casa-7').innerText = '';
    document.getElementById('casa-8').innerText = '';
    document.getElementById('casa-9').innerText = '';
    document.querySelector('#proximoValor').value = 'X';
    document.querySelector('#casasPreenchidas').value = '';
    document.getElementById('msg-vencedor').innerText = '';

}

