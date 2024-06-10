export const brands: { [key: string]: string } = {
  '3djuegos': '3DJuegos',
  anaitgames: 'AnaitGames',
  areajugones: 'Areajugones',
  eurogamer: 'Eurogamer',
  hobbyconsolas: 'HobbyConsolas',
  ign: 'IGN España',
  meristation: 'MeriStation',
  vandal: 'Vandal',
};

export function keyToBrandName(key: string): string {
  return (
    brands[key] || key
  );
}
