
const abecedario = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

function transformar(texto, clave, descifrar = false) {
  let resultado = '';
  clave = clave.toUpperCase().replace(/[^A-Z]/g, '');
  texto = texto.toUpperCase();

  let j = 0;
  for (let i = 0; i < texto.length; i++) {
    const letra = texto[i];
    if (!abecedario.includes(letra)) {
      resultado += letra;
      continue;
    }

    const tIndex = abecedario.indexOf(letra);
    const kIndex = abecedario.indexOf(clave[j % clave.length]);
    let nuevaLetra;

    if (descifrar) {
      nuevaLetra = abecedario[(tIndex - kIndex + 26) % 26];
    } else {
      nuevaLetra = abecedario[(tIndex + kIndex) % 26];
    }

    resultado += nuevaLetra;
    j++;
  }

  return resultado;
}

export function cifrarAlberti(texto, clave) {
  return transformar(texto, clave, false);
}

export function descifrarAlberti(texto, clave) {
  return transformar(texto, clave, true);
}
