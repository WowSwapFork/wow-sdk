export declare const AUCTION: {
    auctionId: number;
    transactionHash: string;
    gasPrice: number;
    auctionStartBlock: number;
    liquidityCollectedBlock: number;
    competitionSimulationBlock: number;
    auction: {
        orders: string[];
        prices: {
            '0x6b175474e89094c44da98b954eedeac495271d0f': string;
            '0x853d955acef822db058eb8505911ed77f175b99e': string;
            '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48': string;
            '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2': string;
            '0xdac17f958d2ee523a2206206994597c13d831ec7': string;
        };
    };
    solutions: ({
        solver: string;
        solverAddress: string;
        objective: {
            total: number;
            surplus: number;
            fees: number;
            cost: number;
            gas: number;
        };
        scoreDiscounted: string;
        ranking: number;
        clearingPrices: {
            '0x6b175474e89094c44da98b954eedeac495271d0f': string;
            '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2': string;
        };
        orders: {
            id: string;
            executedAmount: string;
        }[];
        callData: string;
        score?: undefined;
    } | {
        solver: string;
        solverAddress: string;
        objective: {
            total: number;
            surplus: number;
            fees: number;
            cost: number;
            gas: number;
        };
        score: string;
        ranking: number;
        clearingPrices: {
            '0x6b175474e89094c44da98b954eedeac495271d0f': string;
            '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2': string;
        };
        orders: {
            id: string;
            executedAmount: string;
        }[];
        callData: string;
        scoreDiscounted?: undefined;
    })[];
};
