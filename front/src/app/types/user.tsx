export interface User {
  name: string;
  level: number;
  scoreboard: {
    ppm: number;
    wpm: number;
    accuracy: number;
  };
}
