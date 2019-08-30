import axios from 'axios';
import { getEnv } from '../utils';
import { CosmosRPC } from './CosmosRPC';

describe('BitcoinQuery', () => {
    let rpc: CosmosRPC;
    const address = 'cosmos1lcgtmf3gkdq4cuelly6554znqqhsl6eqy4r3f5';
    const delegationAddress = 'cosmos1vjrx0lks65yefnsz4xk92vugda2z25esym5ypp';

    beforeEach(function() {
        require('dotenv').config({ path: __dirname + '/./.env' });
        rpc = new CosmosRPC(getEnv('COSMOS_RPC_URL'));
        spyOn(axios, 'get').and.returnValue({ data: '' });
        spyOn(axios, 'post').and.returnValue({ data: '' });
    });

    it('should get account', async () => {
        const addToBeCalled = `${getEnv('COSMOS_RPC_URL')}/auth/accounts/${address}`;
        await rpc.getAccount(address);
        expect(axios.get).toHaveBeenCalledWith(addToBeCalled);
    });

    it('should list delegations', async () => {
        await rpc.listDelegations(delegationAddress);
        const addToBeCalled = `${getEnv('COSMOS_RPC_URL')}/staking/delegators/${delegationAddress}/delegations`;
        expect(axios.get).toHaveBeenCalledWith(addToBeCalled);
    });

    it('should broadcast transaction', async () => {
        const data =
            '{"tx":{"memo":"","signatures":[{"pub_key":{"type":"tendermint\\/PubKeySecp256k1","value":"ApGCXwby9foj0IAqOYvmjI+Sd2qdGVdyI1h+CiIFY8xF"},"signature":"5je8nZG5k3Qel1LeJ8f0QAZjwaeRK5Uw\\/DOaPHE64MBCAqYYZCO5l\\/mkxLSzQyxJABk14m+gzCNpSNHiWQm84w=="}],"msg":[{"type":"cosmos-sdk\\/MsgSend","value":{"amount":[{"amount":"2241155","denom":"uatom"}],"from_address":"cosmos135qla4294zxarqhhgxsx0sw56yssa3z0f78pm0","to_address":"cosmos1suasadhn8wmueg93u6js8ala89azqwg6fswuln"}}],"type":"cosmos-sdk\\/MsgSend","fee":{"amount":[{"amount":"1000","denom":"uatom"}],"gas":"200000"}},"mode":"async"}';
        await rpc.broadcastTransaction(data);
        expect(axios.post).toHaveBeenCalled();
    });
});
