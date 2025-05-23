export function generarAleatoria({ longitud, excluir, maxNumeros, maxMayusculas, incluirSimbolos }) {
  const mayus = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const minus = 'abcdefghijklmnopqrstuvwxyz';
  const numeros = '0123456789';
  const simbolos = '!@#$%^&*()-_=+[]{}<>?/';

  const excluirSet = new Set(excluir.split(''));
  const filtrar = str => str.split('').filter(c => !excluirSet.has(c));

  const setMayus = filtrar(mayus);
  const setMinus = filtrar(minus);
  const setNumeros = filtrar(numeros);
  const setSimbolos = incluirSimbolos ? filtrar(simbolos) : [];

  let base = [];

  // Obligatorio: al menos un número, una mayúscula, y un símbolo (si aplica)
  if (setNumeros.length > 0) base.push(random(setNumeros));
  if (setMayus.length > 0) base.push(random(setMayus));
  if (incluirSimbolos && setSimbolos.length > 0) base.push(random(setSimbolos));

  const restoSet = [...setMayus, ...setMinus, ...setNumeros, ...setSimbolos];
  let lastNum = '';
  let countNums = base.filter(c => numeros.includes(c)).length;
  let countMayus = base.filter(c => mayus.includes(c)).length;

  while (base.length < longitud) {
    const c = random(restoSet);

    if (numeros.includes(c)) {
      if (lastNum && Math.abs(Number(c) - Number(lastNum)) === 1) continue;
      if (countNums >= maxNumeros) continue;
      countNums++;
      lastNum = c;
    } else if (mayus.includes(c)) {
      if (countMayus >= maxMayusculas) continue;
      countMayus++;
      lastNum = '';
    } else {
      lastNum = '';
    }

    base.push(c);
  }

  return shuffle(base).join('');
}

export function generarConEnigma(entrada, claveUsuario = 'BDFHJLC...') {
  const base = 'abcdefghijklmnopqrstuvwxyz';
  const clave = (claveUsuario || '').toUpperCase().padEnd(26, 'ABCDEFGHIJKLMNOPQRSTUVWXYZ');

  let salida = '';
  for (let i = 0; i < entrada.length; i++) {
    const letraOriginal = entrada[i];
    const letra = letraOriginal.toLowerCase();
    const idx = base.indexOf(letra);

    if (idx >= 0) {
      const letraCifrada = clave[idx % clave.length];
      salida += letraOriginal === letraOriginal.toUpperCase()
        ? letraCifrada.toUpperCase()
        : letraCifrada.toLowerCase();
    } else {
      salida += letraOriginal;
    }
  }
  return salida;
}

export function generarConAlberti(entrada, claveUsuario = 'kngcadsxbvfhjtiumylzqropwe') {
  const discoFijo = 'abcdefghijklmnopqrstuvwxyz';
  const discoMovil = (claveUsuario || '').toLowerCase().padEnd(26, 'kngcadsxbvfhjtiumylzqropwe');

  let salida = '';
  for (let i = 0; i < entrada.length; i++) {
    const letraOriginal = entrada[i];
    const letra = letraOriginal.toLowerCase();
    const idx = discoFijo.indexOf(letra);

    if (idx >= 0) {
      const cifrada = discoMovil[(idx + i) % 26];
      salida += letraOriginal === letraOriginal.toUpperCase()
        ? cifrada.toUpperCase()
        : cifrada;
    } else {
      salida += letraOriginal;
    }
  }
  return salida;
}

export function generarPersonalizada(frase, fecha, simbolos = '@#') {
  if (!frase || !fecha) return 'Completa los campos.';

  const palabras = frase
    .toLowerCase()
    .normalize("NFD").replace(/[\u0300-\u036f]/g, '')
    .split(/\s+/)
    .filter(Boolean);

  const iniciales = palabras.map(p => p[0]).join('');
  const inicialesCapitalizadas = iniciales.charAt(0).toUpperCase() + iniciales.slice(1);

  const fechaLimpia = fecha.replace(/[^0-9]/g, '');
  const dia = fechaLimpia.slice(0, 2).padStart(2, '0');
  const mes = fechaLimpia.slice(2, 4).padStart(2, '0');
  const anio = fechaLimpia.slice(4).padStart(4, '0');

  const simboloInicio = simbolos[0] || '#';
  const simboloFinal = simbolos[1] || '@';

  const parte1 = `${simboloInicio}${dia}${mes}`;
  const parte2 = `${inicialesCapitalizadas}`;
  const parte3 = `${simboloFinal}${anio.slice(-3)}`;

  return `${parte1}${parte2}${parte3}`;
}

// Utilidades
function random(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function shuffle(arr) {
  return arr.sort(() => Math.random() - 0.5);
}
