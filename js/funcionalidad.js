let pantalla = document.querySelector('#display');
const botones = document.querySelectorAll('button');

let primerNumero = '';
let operador = '';
let expresionCompleta = '';

botones.forEach(boton => {
    boton.addEventListener('click', (n) => {
        const valor = n.target.textContent;
        
        if(valor === 'C') {
            pantalla.value = '0';
            primerNumero = '';
            operador = '';
            expresionCompleta = '';
            return;
        }
        
        if(!isNaN(valor) || valor === '.') {
            if(pantalla.value === '0' || operador === 'nuevo') {
                expresionCompleta = valor;
                operador = '';
            } else {
                expresionCompleta += valor;
            }
        }
        else if(['+', '-', '*', '/'].includes(valor)) {
            if(expresionCompleta === '') {
                alert('Ingrese un número primero');
                return;
            }
            operador = valor;
            expresionCompleta += ` ${valor} `;
        }
        else if(valor === '=') {
            if(expresionCompleta === '' || operador === '') {
                alert('Ingrese una operación válida');
                return;
            }
            
            // Cálculo del resultado (usando eval por simplicidad)
            try {
                const resultado = eval(expresionCompleta);
                pantalla.value = resultado;
                expresionCompleta = resultado.toString();
            } catch {
                alert('Operación inválida');
            }
            return;
        }
        
        pantalla.value = expresionCompleta;
    });
});