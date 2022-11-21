export interface ICharacter {
  _id?: string;
  name: string;
  clan: string;
  clanSymbol?: string;
  village: string;
  villageSymbol?: string;
  img: string;
  jutsus: IJutsu[];
}


export interface IJutsu {
  eng?: string;
  jap: string;
}
