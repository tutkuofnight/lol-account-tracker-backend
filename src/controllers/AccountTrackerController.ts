import { Controller, Inject, Config } from '@asenajs/asena/server';
import { Post } from '@asenajs/asena/web';
import { type Context, ConfigService, CorsMiddleware } from '@asenajs/hono-adapter';

import { AccountTrackerService } from '../services/AccountTrackerService';

import type { AccountNames, Account } from '../types';

@Config()
export class ServerConfig extends ConfigService {
  middlewares = [CorsMiddleware];
}

@Controller('/account')
export class AccountTrackerController {
  @Inject(AccountTrackerService, (service: AccountTrackerService) => service.fetchAllData.bind(service))
  private fetchAllData: (gameName: string, tag: string) => any;

  @Post('/')
  public async GetAccount(context: Context) {
    const profileIconPath = `http://${context.req.header()['host']}/static/profiles/`;

    const accounts: AccountNames[] = await context.getBody();

    let dataList: Account[] = [];
    for (let i = 0; i < accounts.length; i++) {
      const data = await this.fetchAllData(accounts[i].gameName, accounts[i].tagLine);
      dataList.push({ ...data, profileIcon: profileIconPath + `${data.profile.profileIconId}.png` });
    }
    return context.send(dataList);
  }
}
