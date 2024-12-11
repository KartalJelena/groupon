import { Locator } from 'playwright'
import { test, expect } from '@playwright/test'
import { triggerExitIntent } from '../helpers/exitIntent'

test.describe('Offer banner ', () => {

  let banner: Locator, navigationButton: Locator, closeDialog: Locator

  test.beforeEach(async ({ page }) => {

    closeDialog = page.getByRole('dialog').getByLabel('Close')
    banner = page.getByTestId('site-announcement-multi-banner')
    navigationButton = banner.getByLabel('next')

    await page.goto('/')
    await triggerExitIntent(page)
    await closeDialog.click()
    await closeDialog.click()
  })

  test('cycles through three states', async () => {
    const expectedTexts = [`Up To 75% Off! With Groupon's holiday offers, everyone is giftable!  USE CODE GIFTJOY`, `Massages starting at $30 - Treat yourself to ultimate relaxation!`, `Only $25. Hurry & Get a Sam's Club Membership Today`];

    await expect(banner).toContainText(expectedTexts[0])

    await navigationButton.click()
    await expect(banner).toContainText(expectedTexts[1])

    await navigationButton.click()
    await expect(banner).toContainText(expectedTexts[2])
  })
})