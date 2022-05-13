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

    if (operador == '+') {
        var resultado = valor1 + valor2;
    } else {
        if (operador == '-') {
            var resultado = valor1 - valor2;
        } else {
            if (operador == '*') {
                var resultado = (valor1 * valor2).toPrecision(1);
            } else {
                var resultado = (valor1 / valor2).toPrecision(13);
            }
        }
    }
    return resultado.toString().replace('.', ',');
}

// Fun��o para montar o c�lculo na tab calculadora.
function montarCalculo(valor, tipo) {

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

    // Adiciona o primeiro n�mero se n�o for 0.
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

    // Acrescenta outro n�mero se o operador e o total estiver vazio. 
    if (operador == '') {
        if (tipo == 'numero') {
            if (total == '') { // Se n�o � pra reiniciar ainda...
                if ((valor == ',' && primeiroNumero.indexOf(',') == -1) || valor != ',') { // ... e j� tiver v�rgula, n�o p�e outra.
                    document.getElementById('primeiroNumero').innerText += valor;
                    document.getElementById('visor').innerText += valor;
                }

                return;

            } else { // Se pode reiniciar, substitui pelo novo n�mero (reinicializando a conta).
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
            document.getElementById('operador').innerText = valor;
            document.getElementById('visor').innerText += valor;
            return;
        }
    } else { // Se j� tiver operador
        if (tipo == 'numero') {

            if ((segundoNumero == '' && valor != ',') || segundoNumero != '') {
                if (!(segundoNumero == '0' && valor == '0')) { // N�o adiciona mais de 1 zero.

                    if (segundoNumero == '0' && valor != ',') { // Substitui o zero por outro n�mero na primeira casa do segundoNumero.
                        document.getElementById('segundoNumero').innerText = valor;
                        document.getElementById('visor').innerText = valor;
                    } else {
                        if ((valor == ',' && segundoNumero.indexOf(',') == -1) || valor != ',') { // se j� tiver v�rgula, n�o p�e outra ou p�e n�meros.
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
        if (segundoNumero == '') { // Se j� tiver operador e vier outro operador, substitui o mesmo.
            document.getElementById('operador').innerText = valor;
            document.getElementById('visor').innerText = visor.substring(0, visor.length - 1) + valor;
        } else { // Se j� tiver o segundo n�mero, mostra o resultado e limpa o segundo n�mero.
            resultadoCalcular = calcular(operador, parseFloat(primeiroNumero.replace(',', '.')), parseFloat(segundoNumero.replace(',', '.')));
            document.getElementById('primeiroNumero').innerText = resultadoCalcular;
            document.getElementById('segundoNumero').innerText = '';

            if (valor == '=') { // Se for o sinal de = , calcula a conta e limpa o operador.
                document.getElementById('visor').innerText = resultadoCalcular;
                document.getElementById('operador').innerText = '';
                document.getElementById('total').innerText = resultadoCalcular;
            } else { // Se n�o, mostra o resultado + o novo operador.
                document.getElementById('visor').innerText = resultadoCalcular + valor;
                document.getElementById('operador').innerText = valor;
            }
        }


    }


}