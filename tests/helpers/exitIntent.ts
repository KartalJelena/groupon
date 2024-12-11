import { Page } from '@playwright/test'
import { PAGE_HEIGHT, PAGE_WIDTH } from './constants'

export const skipExitIntent = async (page: Page) => {
    await triggerExitIntent(page)
    await page.evaluate(() => {
        window.addEventListener('mouseout', (event) => {
            if (event.clientY <= 0) {
                event.stopImmediatePropagation()
            }
        })
    })
}

export const triggerExitIntent = async (page: Page) => {
    await page.setViewportSize({
        width: PAGE_WIDTH,
        height: PAGE_HEIGHT,
    })

    await page.mouse.move(PAGE_WIDTH, 0)
    await page.mouse.move(PAGE_WIDTH, PAGE_HEIGHT)
    await page.mouse.move(PAGE_WIDTH / 2, 0)
}