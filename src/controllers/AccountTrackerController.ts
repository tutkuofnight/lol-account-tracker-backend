import { Controller, Inject } from '@asenajs/asena/server';
import { Get, Post } from '@asenajs/asena/web';
import { type Context } from '@asenajs/hono-adapter';

import { AccountTrackerService } from '../services/AccountTrackerService';

import type { AccountNames, Account } from '../types';

@Controller('/account')
export class AccountTrackerController {
  @Inject(AccountTrackerService, (service: AccountTrackerService) => service.fetchAllData.bind(service))
  private fetchAllData: (gameName: string, tag: string) => any;

  @Post('/')
  public async GetAllAccounts(context: Context) {
    const profileIconPath = `http://${context.req.header()['host']}/static/profiles/`;

    const accounts: AccountNames[] = await context.getBody();

    let dataList: Account[] = [];
    for (let i = 0; i < accounts.length; i++) {
      const data = await this.fetchAllData(accounts[i].gameName, accounts[i].tagLine);
      dataList.push({ ...data, profileIcon: profileIconPath + `${data.profile.profileIconId}.png` });
    }
    return context.send(dataList);
  }
  @Get('/:gameName/:tagLine')
  public async GetAccount(context: Context) {
    const profileIconPath = `http://${context.req.header()['host']}/static/profiles/`;

    const gameName: string = context.getParam('gameName')
    const tagLine: string = context.getParam('tagLine')

    const data: Account = await this.fetchAllData(gameName, tagLine);
    return context.send({...data, profileIcon: `${profileIconPath + data.profile.profileIconId}.png` });
  }
}
