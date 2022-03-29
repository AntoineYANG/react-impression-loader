/*
 * @Author: Kanata You 
 * @Date: 2022-03-29 20:50:24 
 * @Last Modified by: Kanata You
 * @Last Modified time: 2022-03-29 20:53:03
 */

/**
 * Wait for a while to get data.
 */
const mockFetch = <T>(data: T, timeout: number) => new Promise<T>(resolve => {
  setTimeout(() => {
    resolve(data);
  }, timeout);
});


export default mockFetch;
