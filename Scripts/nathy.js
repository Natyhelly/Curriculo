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

function montarCalculo(valor, tipo) {

    var visor = document.getElementById('visor').innerText;
    var primeiroNumero = document.getElementById('primeiroNumero').innerText;
    var segundoNumero = document.getElementById('segundoNumero').innerText;
    var operador = document.getElementById('operador').innerText;
    var calcular = '';
     
    if (valor == 'C') {
        document.getElementById('visor').innerText = '';
        document.getElementById('primeiroNumero').innerText = '';
        document.getElementById('segundoNumero').innerText = '';
        document.getElementById('operador').innerText = '';
        return;
    }

    if (primeiroNumero == '') {
        if (tipo == 'numero' && valor != '0') {
            document.getElementById('primeiroNumero').innerText = valor;
            document.getElementById('visor').innerText = valor;
        }
        return;
    }

    if (operador == '') {
        if (tipo == 'numero') {
            document.getElementById('primeiroNumero').innerText += valor;
            document.getElementById('visor').innerText += valor;
            return;
        } else {
            document.getElementById('operador').innerText = valor;
            document.getElementById('visor').innerText += valor;
            return;
        }
    } else {
        if (tipo == 'numero') {
            if (segundoNumero == '' && valor != '0') {
                document.getElementById('segundoNumero').innerText += valor;
                document.getElementById('visor').innerText += valor;
            } else if (segundoNumero != '') {
                document.getElementById('segundoNumero').innerText += valor;
                document.getElementById('visor').innerText += valor;
                
            }
            return;
        }

        if (segundoNumero == '') {
            document.getElementById('operador').innerText = valor;
            document.getElementById('visor').innerText = visor.substring(0, visor.length - 1) + valor;
        } else {
            document.getElementById('visor').innerText = calcular(operador, primeiroNumero, segundoNumero);
            document.getElementById('primeiroNumero').innerText = calcular(operador, primeiroNumero, segundoNumero);
        }
    }
    
    
}