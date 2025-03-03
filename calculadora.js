/*TAB NAVIGATION*/
document.querySelectorAll('.tab-button').forEach(button => {
    button.addEventListener('click', () => {
      document.querySelectorAll('.tab-button').forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');
      const tab = button.getAttribute('data-tab');
      document.querySelectorAll('.tab-panel').forEach(panel => {
        panel.classList.toggle('active', panel.id === tab);
      });
    });
  });
  
  /*OPERACIONES BÁSICAS*/
  function calcularBasico(operacion) {
    const num1 = parseFloat(document.getElementById('basico-num1').value);
    const num2 = parseFloat(document.getElementById('basico-num2').value);
    if (isNaN(num1) || isNaN(num2)) {
      alert("Ingresa números válidos");
      return;
    }
    let resultado;
    switch (operacion) {
      case 'sumar':
        resultado = num1 + num2;
        break;
      case 'restar':
        resultado = num1 - num2;
        break;
      case 'multiplicar':
        resultado = num1 * num2;
        break;
      case 'dividir':
        if (num2 === 0) { alert("No se puede dividir por 0"); return; }
        resultado = num1 / num2;
        break;
    }
    document.getElementById('basico-result').innerText = "Resultado: " + resultado;
  }
  
  /*OPERACIONES AVANZADAS*/
  // Potenciación
  function potenciacion() {
    const base = parseFloat(document.getElementById('pot-base').value);
    const exp = parseFloat(document.getElementById('pot-exp').value);
    if (isNaN(base) || isNaN(exp)) { alert("Ingresa valores válidos"); return; }
    const resultado = Math.pow(base, exp);
    document.getElementById('pot-result').innerText = "Resultado: " + resultado;
  }
  // Radicación
  function radicacion() {
    const radicando = parseFloat(document.getElementById('radicando').value);
    const indice = parseFloat(document.getElementById('indice').value);
    if (isNaN(radicando) || isNaN(indice) || indice === 0) {
      alert("Ingresa valores válidos (índice ≠ 0)");
      return;
    }
    const resultado = Math.pow(radicando, 1/indice);
    document.getElementById('rad-result').innerText = "Resultado: " + resultado;
  }
  // Logaritmos (si se deja vacío se calcula ln)
  function logaritmo() {
    const num = parseFloat(document.getElementById('log-num').value);
    const baseInput = document.getElementById('log-base').value;
    if (isNaN(num) || num <= 0) { alert("Ingresa un número positivo válido"); return; }
    let resultado;
    if (baseInput === "" || baseInput === null) {
      resultado = Math.log(num);
    } else {
      const base = parseFloat(baseInput);
      if (isNaN(base) || base <= 0 || base === 1) {
        alert("Ingresa una base válida (mayor a 0 y ≠ 1)");
        return;
      }
      resultado = Math.log(num) / Math.log(base);
    }
    document.getElementById('log-result').innerText = "Resultado: " + resultado;
  }
  // Factorial
  function factorial() {
    const num = parseInt(document.getElementById('fact-num').value);
    if (isNaN(num) || num < 0) { alert("Ingresa un número entero no negativo"); return; }
    let result = 1;
    for (let i = 2; i <= num; i++) { result *= i; }
    document.getElementById('fact-result').innerText = "Resultado: " + result;
  }
  // Módulo o residuo
  function modulo() {
    const num1 = parseFloat(document.getElementById('mod-num1').value);
    const num2 = parseFloat(document.getElementById('mod-num2').value);
    if (isNaN(num1) || isNaN(num2) || num2 === 0) {
      alert("Ingresa valores válidos (divisor ≠ 0)");
      return;
    }
    const resultado = num1 % num2;
    document.getElementById('mod-result').innerText = "Resultado: " + resultado;
  }
  // Redondeo y Truncamiento
  function redondeo() {
    const num = parseFloat(document.getElementById('round-num').value);
    if (isNaN(num)) { alert("Ingresa un número válido"); return; }
    const redondeado = Math.round(num);
    const truncado = Math.trunc(num);
    document.getElementById('round-result').innerText = "Redondeado: " + redondeado + " | Truncado: " + truncado;
  }
  
  /*FUNCIONES TRIGONOMÉTRICAS*/
  function calcularTrigonometrico() {
    const valor = parseFloat(document.getElementById('trigo-input').value);
    const func = document.getElementById('trigo-func').value;
    let resultado;
    if (func === 'sin' || func === 'cos' || func === 'tan') {
      const rad = valor * Math.PI / 180;
      resultado = (func === 'sin') ? Math.sin(rad) :
                  (func === 'cos') ? Math.cos(rad) : Math.tan(rad);
    } else if (func === 'sinh' || func === 'cosh' || func === 'tanh') {
      resultado = (func === 'sinh') ? Math.sinh(valor) :
                  (func === 'cosh') ? Math.cosh(valor) : Math.tanh(valor);
    } else if (func === 'asin' || func === 'acos' || func === 'atan') {
      resultado = (func === 'asin') ? Math.asin(valor) * 180 / Math.PI :
                  (func === 'acos') ? Math.acos(valor) * 180 / Math.PI : Math.atan(valor) * 180 / Math.PI;
    }
    document.getElementById('trigo-result').innerText = "Resultado: " + resultado;
  }
  
  /*NÚMEROS COMPLEJOS*/
  class Complex {
    constructor(real, imag) {
      this.real = real;
      this.imag = imag;
    }
    add(other) { return new Complex(this.real + other.real, this.imag + other.imag); }
    subtract(other) { return new Complex(this.real - other.real, this.imag - other.imag); }
    multiply(other) {
      return new Complex(
        this.real * other.real - this.imag * other.imag,
        this.real * other.imag + this.imag * other.real
      );
    }
    divide(other) {
      const denom = other.real ** 2 + other.imag ** 2;
      if (denom === 0) { alert("División por cero en complejos"); return null; }
      return new Complex(
        (this.real * other.real + this.imag * other.imag) / denom,
        (this.imag * other.real - this.real * other.imag) / denom
      );
    }
    modulus() { return Math.sqrt(this.real ** 2 + this.imag ** 2); }
    argument() { return Math.atan2(this.imag, this.real) * 180 / Math.PI; }
    toString() {
      let sign = this.imag >= 0 ? '+' : '-';
      return `${this.real} ${sign} ${Math.abs(this.imag)}i`;
    }
  }
  function operarComplejos() {
    const r1 = parseFloat(document.getElementById('comp1-real').value);
    const i1 = parseFloat(document.getElementById('comp1-imag').value);
    const r2 = parseFloat(document.getElementById('comp2-real').value);
    const i2 = parseFloat(document.getElementById('comp2-imag').value);
    if (isNaN(r1) || isNaN(i1) || isNaN(r2) || isNaN(i2)) {
      alert("Ingresa valores válidos para números complejos");
      return;
    }
    const comp1 = new Complex(r1, i1);
    const comp2 = new Complex(r2, i2);
    const operacion = document.getElementById('comp-op').value;
    let result;
    switch (operacion) {
      case 'sumar':
        result = comp1.add(comp2).toString();
        break;
      case 'restar':
        result = comp1.subtract(comp2).toString();
        break;
      case 'multiplicar':
        result = comp1.multiply(comp2).toString();
        break;
      case 'dividir':
        const division = comp1.divide(comp2);
        result = division ? division.toString() : "Error";
        break;
      case 'modulo':
        result = comp1.modulus();
        break;
      case 'argumento':
        result = comp1.argument() + "°";
        break;
      default:
        result = "Operación no válida";
    }
    document.getElementById('comp-result').innerText = "Resultado: " + result;
  }
  
  /* FUNCIONES ESTADÍSTICAS */
  function parseNumbers(input) {
    return input.split(',').map(x => parseFloat(x)).filter(x => !isNaN(x));
  }
  function calcularEstadisticas(tipo) {
    const data = document.getElementById('stats-data').value;
    const numbers = parseNumbers(data);
    if (numbers.length === 0) {
      alert("Ingresa números separados por comas");
      return;
    }
    let resultado;
    switch (tipo) {
      case 'media':
        resultado = numbers.reduce((a, b) => a + b, 0) / numbers.length;
        break;
      case 'mediana':
        numbers.sort((a, b) => a - b);
        const mid = Math.floor(numbers.length / 2);
        resultado = (numbers.length % 2 !== 0) ? numbers[mid] : (numbers[mid - 1] + numbers[mid]) / 2;
        break;
      case 'moda':
        let freq = {};
        numbers.forEach(n => { freq[n] = (freq[n] || 0) + 1; });
        let maxFreq = Math.max(...Object.values(freq));
        const modes = Object.keys(freq).filter(k => freq[k] === maxFreq);
        resultado = modes.join(", ");
        break;
      case 'varianza':
        const mean = numbers.reduce((a, b) => a + b, 0) / numbers.length;
        resultado = numbers.reduce((acc, n) => acc + (n - mean) ** 2, 0) / numbers.length;
        break;
      case 'desviacion':
        const m = numbers.reduce((a, b) => a + b, 0) / numbers.length;
        const varianza = numbers.reduce((acc, n) => acc + (n - m) ** 2, 0) / numbers.length;
        resultado = Math.sqrt(varianza);
        break;
      case 'cuartiles':
        numbers.sort((a, b) => a - b);
        const Q2 = medianaArray(numbers);
        const lowerHalf = numbers.filter(n => n < Q2);
        const upperHalf = numbers.filter(n => n > Q2);
        const Q1 = medianaArray(lowerHalf);
        const Q3 = medianaArray(upperHalf);
        resultado = `Q1: ${Q1}, Q2: ${Q2}, Q3: ${Q3}`;
        break;
    }
    document.getElementById('stats-result').innerText = "Resultado: " + resultado;
  }
  function medianaArray(arr) {
    if (arr.length === 0) return 0;
    arr.sort((a, b) => a - b);
    const mid = Math.floor(arr.length / 2);
    return (arr.length % 2 !== 0) ? arr[mid] : (arr[mid - 1] + arr[mid]) / 2;
  }
  
  /* ÁLGEBRA Y MATRICES (2x2) */
  // Determinante de matriz A
  function determinante() {
    const a11 = parseFloat(document.getElementById('a11').value);
    const a12 = parseFloat(document.getElementById('a12').value);
    const a21 = parseFloat(document.getElementById('a21').value);
    const a22 = parseFloat(document.getElementById('a22').value);
    if ([a11, a12, a21, a22].some(isNaN)) {
      alert("Ingresa valores válidos para la matriz A");
      return;
    }
    const det = a11 * a22 - a12 * a21;
    document.getElementById('matrices-result').innerText = "Determinante de A: " + det;
  }
  // Suma de matrices A + B
  function sumarMatrices() {
    const a11 = parseFloat(document.getElementById('a11').value);
    const a12 = parseFloat(document.getElementById('a12').value);
    const a21 = parseFloat(document.getElementById('a21').value);
    const a22 = parseFloat(document.getElementById('a22').value);
    const b11 = parseFloat(document.getElementById('b11').value);
    const b12 = parseFloat(document.getElementById('b12').value);
    const b21 = parseFloat(document.getElementById('b21').value);
    const b22 = parseFloat(document.getElementById('b22').value);
    if ([a11, a12, a21, a22, b11, b12, b21, b22].some(isNaN)) {
      alert("Ingresa valores válidos para las matrices");
      return;
    }
    const res = [
      [a11 + b11, a12 + b12],
      [a21 + b21, a22 + b22]
    ];
    document.getElementById('matrices-result').innerText = "Suma A+B: " + JSON.stringify(res);
  }
  // Multiplicación de matrices A × B
  function multiplicarMatrices() {
    const a11 = parseFloat(document.getElementById('a11').value);
    const a12 = parseFloat(document.getElementById('a12').value);
    const a21 = parseFloat(document.getElementById('a21').value);
    const a22 = parseFloat(document.getElementById('a22').value);
    const b11 = parseFloat(document.getElementById('b11').value);
    const b12 = parseFloat(document.getElementById('b12').value);
    const b21 = parseFloat(document.getElementById('b21').value);
    const b22 = parseFloat(document.getElementById('b22').value);
    if ([a11, a12, a21, a22, b11, b12, b21, b22].some(isNaN)) {
      alert("Ingresa valores válidos para las matrices");
      return;
    }
    const res = [
      [a11 * b11 + a12 * b21, a11 * b12 + a12 * b22],
      [a21 * b11 + a22 * b21, a21 * b12 + a22 * b22]
    ];
    document.getElementById('matrices-result').innerText = "Multiplicación A×B: " + JSON.stringify(res);
  }
  // Resolver sistema de 2 ecuaciones (usando matriz A y vector b tomado de B)
  function resolverSistema() {
    const a11 = parseFloat(document.getElementById('a11').value);
    const a12 = parseFloat(document.getElementById('a12').value);
    const a21 = parseFloat(document.getElementById('a21').value);
    const a22 = parseFloat(document.getElementById('a22').value);
    // Se toman b11 y b21 como vector de términos independientes
    const b1 = parseFloat(document.getElementById('b11').value);
    const b2 = parseFloat(document.getElementById('b21').value);
    if ([a11, a12, a21, a22, b1, b2].some(isNaN)) {
      alert("Ingresa valores válidos para el sistema");
      return;
    }
    const det = a11 * a22 - a12 * a21;
    if (det === 0) { alert("El sistema no tiene solución única"); return; }
    const x = (b1 * a22 - a12 * b2) / det;
    const y = (a11 * b2 - b1 * a21) / det;
    document.getElementById('matrices-result').innerText = "Solución: x = " + x + ", y = " + y;
  }
  
  /* CONVERSIONES */
  // Conversión entre bases numéricas
  function convertirBase() {
    const numStr = document.getElementById('base-num').value;
    const from = parseInt(document.getElementById('base-from').value);
    const to = parseInt(document.getElementById('base-to').value);
    if (numStr === "") { alert("Ingresa un número"); return; }
    const num = parseInt(numStr, from);
    if (isNaN(num)) { alert("Número no válido en base " + from); return; }
    let result;
    if (to === 10) {
      result = num.toString();
    } else if (to === 2) {
      result = num.toString(2);
    } else if (to === 8) {
      result = num.toString(8);
    } else if (to === 16) {
      result = num.toString(16).toUpperCase();
    }
    document.getElementById('base-result').innerText = "Resultado: " + result;
  }
  // Conversión de unidades
  function convertirUnidad() {
    const valor = parseFloat(document.getElementById('unit-input').value);
    const tipo = document.getElementById('unit-type').value;
    if (isNaN(valor)) { alert("Ingresa un valor numérico"); return; }
    let resultado;
    switch (tipo) {
      case 'c-f':
        resultado = (valor * 9/5) + 32;
        break;
      case 'f-c':
        resultado = (valor - 32) * 5/9;
        break;
      case 'km-mi':
        resultado = valor * 0.621371;
        break;
      case 'mi-km':
        resultado = valor / 0.621371;
        break;
      default:
        resultado = valor;
    }
    document.getElementById('unit-result').innerText = "Resultado: " + resultado;
  }
  
  /* CÁLCULO SIMBÓLICO */
  // Derivada usando math.js
  function derivar() {
    const expr = document.getElementById('expr-deriv').value;
    const variable = document.getElementById('var-deriv').value;
    try {
      const deriv = math.derivative(expr, variable).toString();
      document.getElementById('deriv-result').innerText = "Resultado: " + deriv;
    } catch (error) {
      alert("Error en la derivada: " + error);
    }
  }
  // Integral numérica con regla del trapecio
  function integrar() {
    const expr = document.getElementById('expr-int').value;
    const limInf = parseFloat(document.getElementById('lim-inf').value);
    const limSup = parseFloat(document.getElementById('lim-sup').value);
    if (isNaN(limInf) || isNaN(limSup)) { alert("Ingresa límites válidos"); return; }
    try {
      const f = math.compile(expr);
      const n = 1000;
      const h = (limSup - limInf) / n;
      let sum = 0;
      for (let i = 0; i <= n; i++) {
        const x = limInf + i * h;
        const fx = f.evaluate({ x: x });
        sum += (i === 0 || i === n) ? fx : 2 * fx;
      }
      const integral = (h / 2) * sum;
      document.getElementById('int-result').innerText = "Resultado: " + integral;
    } catch (error) {
      alert("Error en la integración: " + error);
    }
  }
  // Cálculo de límite (aproximación numérica)
  function calcularLimite() {
    const expr = document.getElementById('expr-lim').value;
    const limX = parseFloat(document.getElementById('lim-x').value);
    try {
      const f = math.compile(expr);
      const delta = 1e-6;
      const left = f.evaluate({ x: limX - delta });
      const right = f.evaluate({ x: limX + delta });
      const limite = (left + right) / 2;
      document.getElementById('lim-result').innerText = "Resultado: " + limite;
    } catch (error) {
      alert("Error al calcular el límite: " + error);
    }
  }
  // Resolver ecuación diferencial (método de Euler)
  function resolverEcuacion() {
    const eq = document.getElementById('diff-eq').value;
    const x0 = parseFloat(document.getElementById('diff-x0').value);
    const y0 = parseFloat(document.getElementById('diff-y0').value);
    const xTarget = parseFloat(document.getElementById('diff-x').value);
    if (isNaN(x0) || isNaN(y0) || isNaN(xTarget)) {
      alert("Ingresa valores válidos para la ecuación diferencial");
      return;
    }
    try {
      const f = math.compile(eq);
      const steps = 1000;
      const h = (xTarget - x0) / steps;
      let x = x0, y = y0;
      for (let i = 0; i < steps; i++) {
        const slope = f.evaluate({ x: x, y: y });
        y += h * slope;
        x += h;
      }
      document.getElementById('diff-result').innerText = "Resultado: y(" + xTarget + ") ≈ " + y;
    } catch (error) {
      alert("Error al resolver la ecuación diferencial: " + error);
    }
  }
  