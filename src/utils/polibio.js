
const tablaPolibio = [
  ['A', 'B', 'C', 'D', 'E'],
  ['F', 'G', 'H', 'I', 'K'], // J se reemplaza por I
  ['L', 'M', 'N', 'O', 'P'],
  ['Q', 'R', 'S', 'T', 'U'],
  ['V', 'W', 'X', 'Y', 'Z']
];

export function cifrarPolibio(texto) {
  let resultado = '';
  const limpio = texto.toUpperCase().replace(/J/g, 'I').replace(/[^A-Z]/g, '');
  for (let letra of limpio) {
    for (let fila = 0; fila < 5; fila++) {
      for (let col = 0; col < 5; col++) {
        if (tablaPolibio[fila][col] === letra) {
          resultado += `${fila + 1}${col + 1}`;
        }
      }
    }
  }
  return resultado;
}

export function descifrarPolibio(codigo) {
  let resultado = '';
  const pares = codigo.match(/.{1,2}/g) || [];
  for (let par of pares) {
    const fila = parseInt(par[0], 10) - 1;
    const col = parseInt(par[1], 10) - 1;
    if (tablaPolibio[fila] && tablaPolibio[fila][col]) {
      resultado += tablaPolibio[fila][col];
    }
  }
  return resultado;
}
