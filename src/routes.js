import { createPlaywrightRouter } from 'crawlee';

export const router = createPlaywrightRouter();

function extractEmailAddress(mailtoString) {
    if (typeof mailtoString !== 'string') {
        return null;
    }

    const emailPart = mailtoString.split('mailto:')[1];
    if (!emailPart) {
        return null;
    }

    const email = emailPart.split('?')[0];
    return email;
}

router.addDefaultHandler(async ({ request, page, log, pushData }) => {
    let name, rating, reviews, address, phoneNumber, website, email;

    try {
        name = await page.$eval(
            'h1[data-test-target="top-info-header"]',
            (el) => el.textContent.trim()
        );
    } catch (error) {
        log.error(
            `Failed to extract name from ${request.loadedUrl}: ${error.message}`
        );
    }

    try {
        rating = await page.$eval('div.QEQvp span', (el) =>
            el.textContent.trim()
        );
    } catch (error) {
        log.error(
            `Failed to extract rating from ${request.loadedUrl}: ${error.message}`
        );
    }

    try {
        const reviewsText = await page.$eval('div.QEQvp a', (el) =>
            el.textContent.trim()
        );
        reviews = reviewsText ? reviewsText.split(' ')[0] : null;
    } catch (error) {
        log.error(
            `Failed to extract reviews from ${request.loadedUrl}: ${error.message}`
        );
    }

    try {
        address = await page.$eval(
            'div.vQlTa.H3 a[href="#MAPVIEW"]',
            (el) => el.textContent
        );
    } catch (error) {
        log.error(
            `Failed to extract address from ${request.loadedUrl}: ${error.message}`
        );
    }

    try {
        phoneNumber = await page.$eval(
            'div.vQlTa.H3 span:nth-child(2) > span > span.AYHFM > a',
            (el) => el.textContent.trim()
        );
    } catch (error) {
        log.error(
            `Failed to extract phone number from ${request.loadedUrl}: ${error.message}`
        );
    }

    try {
        website = await page.$eval(
            'div.vQlTa.H3 span:nth-child(3) > span > a',
            (el) => el.getAttribute('href')
        );
    } catch (error) {
        log.error(
            `Failed to extract website from ${request.loadedUrl}: ${error.message}`
        );
    }

    try {
        const mailtoString = await page.$eval(
            'div.IdiaP.sNsFa:nth-child(2) > span > a',
            (el) => el.getAttribute('href')
        );
        email = mailtoString ? extractEmailAddress(mailtoString) : 'N/a';
    } catch (error) {
        log.error(
            `Failed to extract email from ${request.loadedUrl}: ${error.message}`
        );
    }

    log.info(`${name}`, { url: request.loadedUrl });

    await pushData({
        url: request.loadedUrl,
        name,
        rating,
        reviews,
        address,
        phoneNumber,
        website,
        email,
    });
});
