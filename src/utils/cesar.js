
function transformar(texto, desplazamiento) {
  return texto.split('').map(char => {
    const c = char.toUpperCase();
    if (c >= 'A' && c <= 'Z') {
      const codigo = ((c.charCodeAt(0) - 65 + desplazamiento + 26) % 26) + 65;
      return String.fromCharCode(codigo);
    }
    return char; // dejar espacios y símbolos sin cambios
  }).join('');
}

export function cifrarCesar(texto, desplazamiento) {
  return transformar(texto, desplazamiento);
}

export function descifrarCesar(texto, desplazamiento) {
  return transformar(texto, -desplazamiento);
}
