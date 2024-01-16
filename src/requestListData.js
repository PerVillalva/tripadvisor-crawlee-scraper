import axios from 'axios';

export async function scrapeLocationData() {
    const payload = [
        {
            variables: {
                page: 'FindRestaurantss',
                params: [
                    { key: 'geoId', value: '295370' },
                    { key: 'offset', value: '30' },
                    { broadened: false },
                ],
                route: {
                    page: 'Restaurants',
                    params: { geoId: 295370, offset: '30', broadened: false },
                },
            },
            extensions: { preRegisteredQueryId: 'f742095592a84542' },
        },
        {
            variables: {
                pageName: 'FindRestaurants',
                relativeUrl:
                    '/FindRestaurants?geo=295370&establishmentTypes=10591&broadened=false',
                parameters: [
                    { key: 'geoId', value: '295370' },
                    { key: 'offset', value: '30' },
                ],
                route: {
                    page: 'Restaurants',
                    params: { geoId: 295370, offset: '30', broadened: false },
                },
            },
            extensions: { preRegisteredQueryId: '1a7ccb2489381df5' },
        },
        {
            variables: {
                page: 'FindRestaurants',
                pos: 'en-US',
                parameters: [
                    { key: 'geoId', value: '295370' },
                    { key: 'offset', value: '30' },
                    { broadened: false },
                ],
                factors: [
                    'TITLE',
                    'META_DESCRIPTION',
                    'MASTHEAD_H1',
                    'MAIN_H1',
                    'IS_INDEXABLE',
                    'RELCANONICAL',
                ],
                route: {
                    page: 'FindRestaurants',
                    params: { geoId: 295370, offset: '30', broadened: false },
                },
            },
            extensions: { preRegisteredQueryId: '8ff5481f70241137' },
        },
        {
            variables: {
                routes: [
                    {
                        page: 'FindRestaurants',
                        params: {
                            geoId: 295370,
                            offset: '0',
                            broadened: false,
                        },
                    },
                    {
                        page: 'FindRestaurants',
                        params: {
                            geoId: 295370,
                            offset: '60',
                            broadened: false,
                        },
                    },
                ],
            },
            extensions: { preRegisteredQueryId: '6017922c6af2b8ff' },
        },
        {
            variables: {
                limit: 900,
                racRequest: null,
                route: {
                    page: 'FindRestaurants',
                    params: { geoId: 295370, offset: '30', broadened: false },
                },
                additionalSelections: [
                    { facet: 'ESTABLISHMENT_TYPES', selections: ['10591'] },
                ],
            },
            extensions: { preRegisteredQueryId: '18770219997e039d' },
        },
        {
            variables: {
                page: 'FindRestaurants',
                locale: 'en-US',
                platform: 'desktop',
                id: '295370',
                urlRoute:
                    '/FindRestaurants?geo=295370&establishmentTypes=10591&broadened=false',
            },
            extensions: { preRegisteredQueryId: 'd194875f0fc023a6' },
        },
    ];

    const BASE_HEADERS = {
        authority: 'www.tripadvisor.com',
        'accept-language': 'en-US,en;q=0.9',
        'user-agent':
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.110 Safari/537.36',
        accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
        'accept-encoding': 'gzip, deflate, br',
    };

    const randomRequestId = [...Array(180)]
        .map(() => Math.random().toString(36)[2] || 0)
        .join('');
    const headers = {
        ...BASE_HEADERS,
        'X-Requested-By': randomRequestId,
        Referer:
            'https://www.tripadvisor.com/Restaurants-g295370-Split_Split_Dalmatia_County_Dalmatia.html',
        Origin: 'https://www.tripadvisor.com',
    };

    try {
        const result = await axios.post(
            'https://www.tripadvisor.com/data/graphql/ids',
            payload,
            { headers }
        );
        const data = result.data;
        const restaurants = data[4].data.response.restaurants;

        const restaurantData = restaurants.map((r) => {
            return {
                name: r.name,
                detailPageUrl: `https://www.tripadvisor.com${r.detailPageRoute.url}`,
                reviewCount: r.reviewSummary.count,
                reviewRating: r.reviewSummary.rating,
            };
        });

        console.log(restaurantData.length);
        return restaurantData;
    } catch (error) {
        console.error('Error:', error);
    }
}
