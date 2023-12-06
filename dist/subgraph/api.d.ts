import { LastDaysVolumeQuery, LastHoursVolumeQuery, TotalsQuery } from './graphql';
import { DocumentNode } from 'graphql/index';
import { Variables } from 'graphql-request';
import { ApiContext, ApiBaseUrls, PartialApiContext } from '../common/configs';
/**
 * CoW Protocol Production Subgraph API configuration.
 * @see {@link https://api.thegraph.com/subgraphs/name/cowprotocol/cow}
 * @see {@link https://api.thegraph.com/subgraphs/name/cowprotocol/cow-gc}
 * @see {@link https://api.thegraph.com/subgraphs/name/cowprotocol/cow-goerli}
 */
export declare const SUBGRAPH_PROD_CONFIG: ApiBaseUrls;
/**
 * CoW Protocol Staging Subgraph API configuration.
 * @deprecated
 * @see {@link https://api.thegraph.com/subgraphs/name/cowprotocol/cow-staging}
 * @see {@link https://api.thegraph.com/subgraphs/name/cowprotocol/cow-gc-staging}
 */
export declare const SUBGRAPH_STAGING_CONFIG: ApiBaseUrls;
/**
 * TheGraph API client for CoW Protocol.
 */
export declare class SubgraphApi {
    API_NAME: string;
    context: ApiContext;
    /**
     * Create a new CoW Protocol API instance.
     * @param context Any properties of the {@link ApiContext} may be overridden by passing a {@link PartialApiContext}.
     */
    constructor(context?: PartialApiContext);
    /**
     * Query the totals from TheGraph for the CoW Protocol.
     * @param contextOverride Override the context for this call only.
     * @returns The totals for the CoW Protocol.
     */
    getTotals(contextOverride?: PartialApiContext): Promise<TotalsQuery['totals'][0]>;
    /**
     * Query the volume over the last N days from TheGraph for the CoW Protocol.
     * @param {number} days The number of days to query.
     * @param {PartialApiContext} contextOverride Override the context for this call only.
     * @returns The volume for the last N days.
     */
    getLastDaysVolume(days: number, contextOverride?: PartialApiContext): Promise<LastDaysVolumeQuery>;
    /**
     * Query the volume over the last N hours from TheGraph for the CoW Protocol.
     * @param {number} hours The number of hours to query.
     * @param {PartialApiContext} contextOverride Override the context for this call only.
     * @returns The volume for the last N hours.
     */
    getLastHoursVolume(hours: number, contextOverride?: PartialApiContext): Promise<LastHoursVolumeQuery>;
    /**
     * Run a query against the CoW Protocol Subgraph.
     * @param {string | DocumentNode} query GQL query string or DocumentNode.
     * @param {Variables | undefined} variables To be passed to the query.
     * @param {PartialApiContext} contextOverride Override the context for this call only.
     * @returns Results of the query.
     * @throws {@link CowError} if the query fails.
     */
    runQuery<T>(query: string | DocumentNode, variables?: Variables | undefined, contextOverride?: PartialApiContext): Promise<T>;
    /**
     * Override parts of the context for a specific call.
     * @param {PartialApiContext} contextOverride Override the context for this call only.
     * @returns {ApiContext} The context with the override applied.
     */
    private getContextWithOverride;
    /**
     * Get the base URLs for the given environment.
     * @param {CowEnv} env The environment to get the base URLs for.
     * @returns {ApiBaseUrls} The base URLs for the given environment.
     */
    private getEnvConfigs;
}
