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


function montarCalculo(valor, tipo) { // Fun��o para montar o c�lculo na tab calculadora.

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

    } else {
        if (tipo == 'operador' && valor == '<-') {
            document.getElementById('visor').innerText = '0';
            document.getElementById('primeiroNumero').innerText = '';
        }

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
            if (valor !== '=' && valor !== '<-') {
                document.getElementById('operador').innerText = valor;
                document.getElementById('visor').innerText += valor;
                return;
            }
            if (valor == '<-') {
                document.getElementById('visor').innerText = visor.substring(0, visor.length - 1);
                document.getElementById('primeiroNumero').innerText = visor.substring(0, visor.length - 1)
            }

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

document.addEventListener("keydown", function pressionarTecla(tecla) {
    if (event.defaultPrevented)
        return; // Do nothing if the event was already processed

    switch (tecla.key) {
        case 'Enter':
            document.querySelector("#botao-igual").click();
            break;
        case 'Escape':
            document.querySelector("#botao-reset").click();
            break;
        case '/':
            document.querySelector("#botao-dividir").click();
            break;
        case '*':
            document.querySelector("#botao-vezes").click();
            break;
        case '-':
            document.querySelector("#botao-menos").click();
            break;
        case '+':
            document.querySelector("#botao-mais").click();
            break;
        case ',':
            document.querySelector("#botao-decimal").click();
            break;
        case '0':
            document.querySelector("#botao-0").click();
            break;
        case '1':
            document.querySelector("#botao-1").click();
            break;
        case '2':
            document.querySelector("#botao-2").click();
            break;
        case '3':
            document.querySelector("#botao-3").click();
            break;
        case '4':
            document.querySelector("#botao-4").click();
            break;
        case '5':
            document.querySelector("#botao-5").click();
            break;
        case '6':
            document.querySelector("#botao-6").click();
            break;
        case '7':
            document.querySelector("#botao-7").click();
            break;
        case '8':
            document.querySelector("#botao-8").click();
            break;
        case '9':
            document.querySelector("#botao-9").click();
            break;
        default:
            return; // Quit when this doesn't handle the key event.
    }
});

function jogoDaVelha(casa) {
    var proximoValor = document.querySelector('#proximoValor').value;

    //busca conte�do da casa
    var conteudoCasa = document.getElementById(casa).innerText;
    var casaBloqueada = document.getElementById(casa).getAttribute('disabled') == 'disabled';

    //valida conteudo da casa 
    if (conteudoCasa == '' && !casaBloqueada) {
        document.querySelector('#casasPreenchidas').value += 1;
        document.getElementById(casa).innerText = proximoValor;

        if (proximoValor == 'X')
            document.querySelector('#proximoValor').value = 'O';
        else
            document.querySelector('#proximoValor').value = 'X';

        document.querySelector('#' + casa).setAttribute('disabled', 'disabled');

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
        vencedor('X');
    else if (casa4 == 'X' && casa5 == 'X' && casa6 == 'X')
        vencedor('X');
    else if (casa7 == 'X' && casa8 == 'X' && casa9 == 'X')
        vencedor('X');
    else if (casa1 == 'X' && casa4 == 'X' && casa7 == 'X')
        vencedor('X');
    else if (casa2 == 'X' && casa5 == 'X' && casa8 == 'X')
        vencedor('X');
    else if (casa3 == 'X' && casa6 == 'X' && casa9 == 'X')
        vencedor('X');
    else if (casa1 == 'X' && casa5 == 'X' && casa9 == 'X')
        vencedor('X');
    else if (casa3 == 'X' && casa5 == 'X' && casa7 == 'X')
        vencedor('X');

    else if (casa1 == 'O' && casa2 == 'O' && casa3 == 'O')
        vencedor('O');
    else if (casa4 == 'O' && casa5 == 'O' && casa6 == 'O')
        vencedor('O');
    else if (casa7 == 'O' && casa8 == 'O' && casa9 == 'O')
        vencedor('O');
    else if (casa1 == 'O' && casa4 == 'O' && casa7 == 'O')
        vencedor('O');
    else if (casa2 == 'O' && casa5 == 'O' && casa8 == 'O')
        vencedor('O');
    else if (casa3 == 'O' && casa6 == 'O' && casa9 == 'O')
        vencedor('O');
    else if (casa1 == 'O' && casa5 == 'O' && casa9 == 'O')
        vencedor('O');
    else if (casa3 == 'O' && casa5 == 'O' && casa7 == 'O')
        vencedor('O')

    else if (document.querySelector('#casasPreenchidas').value.length == 9)
        vencedor('');

    return;
}

function reiniciarJogo() {
    for (let i = 1; i <= 9; i++) {
        document.getElementById('casa-' + i.toString()).innerText = '';
        document.querySelector('#casa-' + i.toString()).removeAttribute('disabled');
    }
    document.querySelector('#proximoValor').value = 'X';
    document.querySelector('#casasPreenchidas').value = '';
    document.getElementById('msg-vencedor').innerText = '';
}

function vencedor(jogador) {

    if (jogador == 'X' || jogador == 'O') {
        document.querySelector('#msg-vencedor').innerText = jogador + ' ganhou!!';

        for (let i = 1; i <= 9; i++) {
            document.querySelector('#casa-' + i).setAttribute('disabled', 'disabled');
        }
    } else
        document.getElementById('msg-vencedor').innerText = 'Game over :(';

}

