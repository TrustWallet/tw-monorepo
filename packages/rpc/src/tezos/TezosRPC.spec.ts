import axios from 'axios';
import { getEnv } from '../utils';
import { TezosRPC } from './TezosRPC';

describe('TezosRPC', () => {
    let rpc: TezosRPC;

    let contractId: string;
    let block: string;
    let manager: string;

    beforeEach(function() {
        require('dotenv').config({ path: __dirname + '/./.env' });
        rpc = new TezosRPC(getEnv('TEZOS_RPC_URL'));

        contractId = 'tz1Wuua6s88NN3jnbixiKhrywqmM6kjeTLYV';
        manager = 'tz1Wuua6s88NN3jnbixiKhrywqmM6kjeTLYV';
        block = 'BKicMfwtgtAL28iD2uZk12PpuS6i2pFysC3syVT44nMNLkGb4QA';
    });

    it('Should get Account', async function() {
        let account = await rpc.getManagerKey(contractId);
        expect(account.manager).toBe(manager);
    });

    it('Should get Head', async function() {
        expect(await rpc.getManagerKey(block)).toBeTruthy();
    });

    it('Should get Manager Key', async function() {
        let response = await rpc.getManagerKey(block);
        expect(response.manager).toBe(manager);
    });

    it('Should get Block Operations', async function() {
        const ops = await rpc.getBlockOperations(block);
        expect(ops.contents.length).toBeGreaterThan(0);
    });

    it('Should Broadcast Transaction', async function() {
        const data =
            'a75719f568f22f279b42fa3ce595c5d4d0227cc8cf2af351a21e50d2ab71ab3208000002298c03ed7d454a101eb7022bc95f7e5f41ac78d0860303c8010080c2d72f0000e7670f32038107a59a2b9cfefae36ea21f5aa63c00eff5b0ce828237f10bab4042a891d89e951de2c5ad4a8fa72e9514ee63fec9694a772b563bcac8ae0d332d57f24eae7d4a6fad784a8436b6ba03d05bf72e4408';

        await rpc.broadcastTransaction(data);
        expect(axios.post).toHaveBeenCalled();
    });
});
