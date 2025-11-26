export type AccountNames = {
  gameName: string;
  tagLine: string;
};

export type AccountInfo = {
  puuid: string;
  gameName: string;
  tagLine: string;
};

export type AccountLeague = {
  queueType: string;
  tier: string;
  rank: string;
  leaguePoints: number;
  wins: number;
  loses: number;
};

export type AccountProfile = {
  profileIconId: number;
  revisionDate: number;
  summonerLevel: number;
};

export type AccountActiveGame = {
  gameId?: number;
  gameType?: string;
  gameStartTime?: number;
};

export type Account = {
  profile: AccountInfo & AccountProfile;
  leagues: AccountLeague;
  activeGame: AccountActiveGame | null;
  region: string;
  profileIcon?: string;
};
