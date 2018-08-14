// @flow

// Override the default `fetch` because we're using the fetch-intercept
// library:
declare function fetch(endpoint: string, config: any): Promise<any>;
