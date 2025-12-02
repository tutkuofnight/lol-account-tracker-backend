import { Service } from '@asenajs/asena/server';
import type { Account, AccountProfile, AccountActiveGame, AccountLeague, AccountInfo } from '../types';
import { baseUrl } from '../lib/veriables';
import request from '../lib/request';

@Service()
export class AccountTrackerService {
  
  public async fetchAllData(gameName: string, tag: string) {
    const accData = await this.fetchAccountData(gameName, tag);
    const region = await this.fetchAccountRegion(accData.puuid);
    const [accProfile, accLeague, accActiveGame] = await Promise.all([
      this.fetchAccountProfile(accData.puuid, region),
      this.fetchAccountCurrentLeague(accData.puuid, region),
      this.fetchAccountActiveGame(accData.puuid, region),
    ]);

    const account: Account = {
      profile: {
        ...accData,
        ...accProfile,
      },
      leagues: accLeague,
      activeGame: accActiveGame,
      region,
    };
    return account;
  }
  
  private async fetchAccountData(gameName: string, tag: string): Promise<AccountInfo> {
    const { data }: { data: AccountInfo } = await request(
      `${baseUrl()}/riot/account/v1/accounts/by-riot-id/${gameName}/${tag}`,
    );
    return data;
  }

  private async fetchAccountRegion(puuid: string): Promise<string> {
    const { data }: { data: { region: string } } = await request(
      `${baseUrl()}/riot/account/v1/region/by-game/lol/by-puuid/${puuid}`,
    );
    return data.region;
  }

  private async fetchAccountProfile(puuid: string, region: string): Promise<AccountProfile> {
    const { data }: { data: AccountProfile } = await request(
      `${baseUrl(region)}/lol/summoner/v4/summoners/by-puuid/${puuid}`,
    );
    return data;
  }

  private async fetchAccountActiveGame(puuid: string, region: string): Promise<AccountActiveGame | null> {
    try {
      const { data, status }: { data: AccountActiveGame; status: number } = await request(
        `${baseUrl(region)}/lol/spectator/v5/active-games/by-summoner/${puuid}`,
      );
      if (status !== 200) {
        return null;
      }
      return data;
    } catch (error) {
      return null;
    }
  }

  private async fetchAccountCurrentLeague(puuid: string, region: string): Promise<AccountLeague> {
    const { data }: { data: AccountLeague } = await request(
      `${baseUrl(region)}/lol/league/v4/entries/by-puuid/${puuid}`,
    );
    return data;
  }
}
