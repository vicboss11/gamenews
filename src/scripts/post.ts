export function getReadingTime(html: string): {
  minutes: number;
  seconds: number;
} {
  // Elimina las etiquetas HTML y obtiene el texto
  const text = html.replace(/<\/?[^>]+(>|$)/g, '');

  // Elimina caracteres no alfabéticos y cuenta las letras
  const letters = text.replace(/[^a-zA-Z]/g, '').length;

  // Velocidad de lectura estimada: 200 palabras por minuto (1 palabra = 5 letras)
  const wordsPerMinute = 200;
  const lettersPerWord = 5;

  // Calcula el número de palabras
  const numWords = letters / lettersPerWord;

  // Calcula el tiempo de lectura en minutos
  const readingTimeMinutes = numWords / wordsPerMinute;

  // Convierte a un formato amigable (minutos y segundos)
  const readingTimeSeconds = Math.ceil(readingTimeMinutes * 60);
  const minutes = Math.floor(readingTimeSeconds / 60);
  const seconds = readingTimeSeconds % 60;

  return {
    minutes,
    seconds,
  };
}
