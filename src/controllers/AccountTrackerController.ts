import { Controller, Inject } from '@asenajs/asena/server';
import { Get } from '@asenajs/asena/web';
import { type Context, HTTPException } from '@asenajs/hono-adapter';

import { AccountTrackerService } from '../services/AccountTrackerService';

import type { AccountNames, Account } from '../types';

@Controller('/account')
export class AccountTrackerController {
  @Inject(AccountTrackerService, (service: AccountTrackerService) => service.fetchAllData.bind(service))
  private fetchAllData: (gameName: string, tag: string) => any;

  @Get('/')
  public async getAllAccounts(context: Context) {
    const profileIconPath = `http://${context.req.header()['host']}/static/profiles/`;
    
    const gameNames: string[] = await context.getQueryAll("gameNames");
    const tagLines: string[] = await context.getQueryAll("tagLines");
    
    if(gameNames.length != tagLines.length){
      throw new HTTPException(500,{res: await context.send("gameNames and tagLines not matched")})
    }
    
    const accounts : AccountNames[]=[];
    
    for(let i = 0; i < gameNames.length; i++){
      accounts.push({gameName:gameNames[i],tagLine:tagLines[i]});
    }
    
    let dataList: Account[] = [];
    for (let i = 0; i < accounts.length; i++) {
      const data = await this.fetchAllData(accounts[i].gameName, accounts[i].tagLine);
      dataList.push({ ...data, profileIcon: profileIconPath + `${data.profile.profileIconId}.png` });
    }
    return context.send(dataList);
  }
  
  @Get('/:gameName/:tagLine')
  public async getAccount(context: Context) {
    const profileIconPath = `http://${context.req.header()['host']}/static/profiles/`;

    const gameName: string = context.getParam('gameName')
    const tagLine: string = context.getParam('tagLine')

    const data: Account = await this.fetchAllData(gameName, tagLine);
    return context.send({...data, profileIcon: `${profileIconPath + data.profile.profileIconId}.png` });
  }
}
