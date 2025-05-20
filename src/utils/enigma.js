const abecedario = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

// Rotores clásicos Enigma I (mapeo interno)
const ROTORES = {
  I:      'EKMFLGDQVZNTOWYHXUSPAIBRCJ',
  II:     'AJDKSIRUXBLHWTMCQGZNPYFVOE',
  III:    'BDFHJLCPRTXVZNYEIWGAKMUSQO'
};

// Reflector B
const REFLECTOR_B = 'YRUHQSLDPXNGOKMIEBFZCWVJAT';

function letraAIndice(letra) {
  return abecedario.indexOf(letra.toUpperCase());
}

function indiceALetra(indice) {
  return abecedario[(indice + 26) % 26];
}

function pasoPorRotor(letra, rotor, offset, inverso = false) {
  const index = (letraAIndice(letra) + offset) % 26;
  const letraMapeada = inverso
    ? indiceALetra((rotor.indexOf(abecedario[index]) - offset + 26) % 26)
    : rotor[index];
  return letraMapeada;
}

export function enigmaProcesar(texto, clave = 'ABC') {
  clave = clave.toUpperCase().padEnd(3, 'A').slice(0, 3);
  let [pos1, pos2, pos3] = clave.split('').map(letraAIndice);

  const rotor1 = ROTORES.I;
  const rotor2 = ROTORES.II;
  const rotor3 = ROTORES.III;
  const reflector = REFLECTOR_B;

  let resultado = '';

  for (let char of texto.toUpperCase()) {
    if (!abecedario.includes(char)) {
      resultado += char;
      continue;
    }

    // Paso directo: rotores hacia el reflector
    let paso1 = pasoPorRotor(char, rotor1, pos1);
    let paso2 = pasoPorRotor(paso1, rotor2, pos2);
    let paso3 = pasoPorRotor(paso2, rotor3, pos3);

    // Reflector
    let reflejado = reflector[letraAIndice(paso3)];

    // Paso inverso: regreso por los rotores
    let paso4 = pasoPorRotor(reflejado, rotor3, pos3, true);
    let paso5 = pasoPorRotor(paso4, rotor2, pos2, true);
    let paso6 = pasoPorRotor(paso5, rotor1, pos1, true);

    resultado += paso6;

    // Rotación de rotores (avance)
    pos1 = (pos1 + 1) % 26;
    if (pos1 === 0) pos2 = (pos2 + 1) % 26;
    if (pos1 === 0 && pos2 === 0) pos3 = (pos3 + 1) % 26;
  }

  return resultado;
}

export function procesarEnigmaConPasos(texto, clave = 'ABC') {
  clave = clave.toUpperCase().padEnd(3, 'A').slice(0, 3);
  let [pos1, pos2, pos3] = clave.split('').map(letraAIndice);

  const rotor1 = ROTORES.I;
  const rotor2 = ROTORES.II;
  const rotor3 = ROTORES.III;
  const reflector = REFLECTOR_B;

  let resultado = '';
  let pasos = [];

  for (let char of texto.toUpperCase()) {
    if (!abecedario.includes(char)) {
      resultado += char;
      pasos.push(`'${char}' no se transforma`);
      continue;
    }

    const entrada = char;

    let paso1 = pasoPorRotor(entrada, rotor1, pos1);
    let paso2 = pasoPorRotor(paso1, rotor2, pos2);
    let paso3 = pasoPorRotor(paso2, rotor3, pos3);

    let reflejado = reflector[letraAIndice(paso3)];

    let paso4 = pasoPorRotor(reflejado, rotor3, pos3, true);
    let paso5 = pasoPorRotor(paso4, rotor2, pos2, true);
    let paso6 = pasoPorRotor(paso5, rotor1, pos1, true);

    resultado += paso6;

    pasos.push(
      `'${entrada}' → R1:${paso1} → R2:${paso2} → R3:${paso3} → Ref:${reflejado} → R3←:${paso4} → R2←:${paso5} → R1←:${paso6}`
    );

    // Avance de rotores después de cada letra
    pos1 = (pos1 + 1) % 26;
    if (pos1 === 0) pos2 = (pos2 + 1) % 26;
    if (pos1 === 0 && pos2 === 0) pos3 = (pos3 + 1) % 26;
  }

  return { resultado, pasos };
}





