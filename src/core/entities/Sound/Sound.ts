export interface Sound {
  emojis: string;
  id: string;
  isFavorite: boolean;
  name: string;
  track: string;
}

export class Sound {
  constructor({ emojis, id, isFavorite, name, track }: Sound) {
    this.emojis = emojis;
    this.id = id;
    this.isFavorite = isFavorite;
    this.name = name;
    this.track = track;
  }
}
