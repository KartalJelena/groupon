import { Page } from '@playwright/test'
import { PAGE_HEIGHT, PAGE_WIDTH } from './constants'

export const skipExitIntent = async (page: Page) => {
    await page.evaluate(() => {
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                const dialogs = document.querySelectorAll('dialog')
                dialogs.forEach((dialog) => {
                    dialog.remove()
                })
            })
        })

        observer.observe(document.body, { childList: true, subtree: true })

        window.addEventListener('mouseout', (event: MouseEvent) => {
            if (event.clientY <= 0) {
                event.stopImmediatePropagation()
            }
        })

        const originalCreateElement = document.createElement.bind(document)
        document.createElement = function (tagName: string): HTMLElement {
            if (tagName.toLowerCase() === 'dialog') {
                console.log('Blocked creation of dialog element!')
                return originalCreateElement('div')
            }
            return originalCreateElement(tagName)
        }
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