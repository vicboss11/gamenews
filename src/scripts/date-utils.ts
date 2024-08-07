export function getFormattedDate(date: string) {
  return new Date(date).toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export function isToday(dateString: string): boolean {
  // Obtener la fecha actual en la zona horaria de Madrid
  const givenDate = new Date(dateString);
  const today = new Date();

  return (
    givenDate.getUTCFullYear() === today.getUTCFullYear() &&
    givenDate.getUTCMonth() === today.getUTCMonth() &&
    givenDate.getUTCDate() === today.getUTCDate()
  );
}
