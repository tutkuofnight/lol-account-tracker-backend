export const riotApiKey = process.env['RIOT_DEV_KEY'];

export function baseUrl(region?: string) {
  return region ? `https://${region}.api.riotgames.com` : 'https://europe.api.riotgames.com';
}
