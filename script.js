// seleciona o input
const input = document.getElementById('campo');
const segundoCampo = document.getElementById('segundoCampo');

// preenche o input com zeros ao receber o foco
input.addEventListener('focus', () => {
    if (input.value === "") {
        // insere o máscara no input
        input.value = '00000000000-0';
    }
});

// adiciona o último caractere digitado à direita
input.addEventListener('keypress', (event) => {
    // obtém o valor do input
    let valor = input.value;
    // retirar o hífen do input
    valor = valor.replace('-', '');
    // obtém a tecla pressionada
    const tecla = event.key;
    // verifica se a tecla é um número
    if (/^\d$/.test(tecla)) {
        // verifica se o primeiro caractere é igual à zero
        if (valor[0] === '0') {
            // percorre o valor do input da esquerda para a direita
            for (let i = 0; i < valor.length; i++) {
                // se o caractere for diferente de zero, move para a esquerda
                if (valor.charAt(i) !== '0') {
                    valor = valor.substring(1) + tecla;
                    break;
                }
                // se o caractere for zero e for o último, substitui pelo caractere digitado
                else if (i === valor.length - 1) {
                    valor = valor.substring(0, i) + tecla;
                    break;
                }
            }
        }
        // pega os valores que serão exibidos antes do hífen
        let valorInicial = valor.substr(0, 11);
        // pega os valores que serão exibidos após o hífen
        let valorFinal = valor.substr(11);
        // atualiza o valor do input
        input.value = valorInicial + '-' + valorFinal;
        // impede que o caractere digitado seja inserido novamente
        event.preventDefault();
    }
    // verifica a tecla tab
    else if (tecla === 'Tab') {
        segundoCampo.focus(); // Move o foco para o segundo input
    }
    // limita o input para 13 caracteres
    if (input.value.length >= 13) {
        event.preventDefault();
    }
});

// limpa o input ao perder o foco se o valor dele for igual ao inicial
input.addEventListener('blur', () => {
    if (input.value === '00000000000-0') {
        // define o valor do input como em branco
        input.value = '';
    }
});

// verifica a tecla backspace
input.addEventListener('keydown', (event) => {
    // armazena a última a tecla pressionada
    const tecla = event.key;
    // armazena o valor inserido no input
    let valor = input.value;
    // retirar o hífen do valor
    valor = valor.replace('-', '');
    // se a tecla for "Backspace" e o último caractere digitado for um número, substitui por "0"
    if (tecla === 'Backspace' && /^\d$/.test(valor.charAt(valor.length - 1))) {
        valor = valor.substring(0, valor.length - 1);
        valor = '0' + valor;
        // pega os valores que serão exibidos antes do hífen
        let valorInicialB = valor.substr(0, 11);
        // pega os valores que serão exibidos após o hífen
        let valorFinalB = valor.substr(11);
        input.value = valorInicialB + '-' + valorFinalB;
        event.preventDefault();
    }
});