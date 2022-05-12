function alteraTextPaginaTab(text) {
    document.getElementById('textPaginaTab').innerText = text;
}

function mensagemNaFoto(mensagem) {
    alert(mensagem);
}

function calcular(operador, valor1, valor2) {    
    if (operador == '+') {
        var resultado = parseInt(valor1) + parseInt(valor2);
    } else {
        if (operador == '-') {
            var resultado = valor1 - valor2;
        } else {
            if (operador == '*') {
                var resultado = valor1 * valor2;
            } else {
                var resultado = valor1 / valor2;
            }
        }
    }
    return resultado;    
}

// Função para montar o cálculo na tab calculadora.
function montarCalculo(valor, tipo) {
    
    var visor = document.getElementById('visor').innerText;
    var primeiroNumero = document.getElementById('primeiroNumero').innerText;
    var segundoNumero = document.getElementById('segundoNumero').innerText;
    var operador = document.getElementById('operador').innerText;
    var resultadoCalcular = '';
    var total = document.getElementById('total').innerText;

    // Limpa o visor e todos os campos escondidos.
    if (valor == 'C') {
        document.getElementById('visor').innerText = ''; 
        document.getElementById('primeiroNumero').innerText = '';
        document.getElementById('segundoNumero').innerText = '';
        document.getElementById('operador').innerText = '';
        document.getElementById('total').innerText = '';
        return;
    }

    // Adiciona o primeiro número se não for 0.
    if (primeiroNumero == '') {
        if (tipo == 'numero' && valor != '0' ) {
            document.getElementById('primeiroNumero').innerText = valor;
            document.getElementById('visor').innerText = valor;
            
        }
        return;
    }

    // Acrescenta outro número se o operador e o total estiver vazio. 
    if (operador == '') {
        if (tipo == 'numero') {
            if (total == '') {
                document.getElementById('primeiroNumero').innerText += valor;
                document.getElementById('visor').innerText += valor;
                return;
            } else { // Se não, substitui pelo novo número (reinicializando a conta).
                document.getElementById('primeiroNumero').innerText = valor;
                document.getElementById('visor').innerText = valor;
                document.getElementById('total').innerText = '';
                return;
            }
        } else { // Se for operador, acrescenta ele no visor.
            document.getElementById('operador').innerText = valor;
            document.getElementById('visor').innerText += valor;
            return;
        }
    } else { // Se já tiver operador
        if (tipo == 'numero') {
            // Adiociona o segundo número, proibindo o zero na primeira casa.
            if ((segundoNumero == '' && valor != '0') || segundoNumero != '') {
                document.getElementById('segundoNumero').innerText += valor;
                document.getElementById('visor').innerText += valor;
            } 
            return;
        }

        if (segundoNumero == '') { // Se já tiver operador e vier outro operador, substitui o mesmo.
            document.getElementById('operador').innerText = valor;
            document.getElementById('visor').innerText = visor.substring(0, visor.length - 1) + valor;
        } else { // Se já tiver o segundo número, mostra o resultado e limpa o segundo número.
            resultadoCalcular = calcular(operador, primeiroNumero, segundoNumero);
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