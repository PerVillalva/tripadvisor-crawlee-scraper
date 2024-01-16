// For more information, see https://crawlee.dev/
import { PlaywrightCrawler, ProxyConfiguration, RequestList } from 'crawlee';
import { firefox } from 'playwright';
import { router } from './routes.js';
import { scrapeLocationData } from './requestListData.js';

const restaurantsData = await scrapeLocationData();

const requestList = await RequestList.open(
    'my-request-list',
    restaurantsData.map((restaurant) => restaurant.detailPageUrl)
);

const crawler = new PlaywrightCrawler({
    launchContext: {
        launcher: firefox,
    },
    requestList,
    proxyConfiguration: new ProxyConfiguration({
        proxyUrls: ['<YOUR_PROXY_URL'],
    }),
    requestHandler: router,
    maxConcurrency: 30,
    // ensure the crawler never exceeds 250 requests per minute
    maxRequestsPerMinute: 250,
});

await crawler.run();
