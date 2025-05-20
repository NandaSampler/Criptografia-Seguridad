
export function cifrarEscitala(texto, columnas) {
  texto = texto.replace(/\\s+/g, ''); // quitar espacios
  const filas = Math.ceil(texto.length / columnas);
  let matriz = Array.from({ length: filas }, () => []);

  // Rellenar la matriz por filas
  for (let i = 0; i < texto.length; i++) {
    const fila = Math.floor(i / columnas);
    matriz[fila].push(texto[i]);
  }

  // Leer columna por columna
  let resultado = '';
  for (let col = 0; col < columnas; col++) {
    for (let fila = 0; fila < filas; fila++) {
      resultado += matriz[fila][col] || '';
    }
  }

  return resultado;
}

export function descifrarEscitala(texto, columnas) {
  const filas = Math.ceil(texto.length / columnas);
  const total = filas * columnas;
  const faltantes = total - texto.length;
  let matriz = Array.from({ length: columnas }, () => []);

  let k = 0;
  for (let col = 0; col < columnas; col++) {
    const limite = col < columnas - faltantes ? filas : filas - 1;
    for (let fila = 0; fila < limite; fila++) {
      matriz[col].push(texto[k++]);
    }
  }

  // Leer por filas
  let resultado = '';
  for (let fila = 0; fila < filas; fila++) {
    for (let col = 0; col < columnas; col++) {
      resultado += matriz[col][fila] || '';
    }
  }

  return resultado;
}
