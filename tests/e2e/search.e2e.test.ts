import { Locator } from 'playwright'
import { test, expect } from '@playwright/test'
import { skipExitIntent } from '../helpers/exitIntent'

test.describe('Header search ', () => {
  const TEST_LOCATION = 'San Francisco, CA 94016'

  let searchInput: Locator, searchResultsContainer: Locator, popularSearches: Locator
  let showAllResultsModalButton: Locator, locationSearchButton: Locator, locationSearchInput: Locator
  let locationPickerModal: Locator, setCurrentLocationButton: Locator
  let specificLocationButton: Locator

  test.beforeEach(async ({ page }) => {
    searchInput = page.getByTestId('search-input').first()
    searchResultsContainer = page.getByTestId('search-results-container')
    popularSearches = searchResultsContainer.getByText('Popular searches')
    showAllResultsModalButton = searchResultsContainer.getByRole('button', { name: 'Show all results' })
    locationSearchButton = page.getByTestId('desktopSearchBar').getByTestId('location-search-button').first()
    locationPickerModal = page.getByRole('dialog').getByTestId('autocomplete-options-container')
    locationSearchInput = page.getByRole('dialog').getByTestId('autocomplete-input')
    setCurrentLocationButton = locationPickerModal.getByRole('button', { name: 'Set Current Location' })
    specificLocationButton = locationPickerModal.getByRole('button', { name: TEST_LOCATION})

    await page.goto('/')

    await skipExitIntent(page)
  })

  test('opens popular search modal when clicks in the input area', async () => {
    await searchInput.click()

    expect(await searchResultsContainer.isVisible()).toBe(true)
    await popularSearches.waitFor()

    expect(await popularSearches.isVisible()).toBe(true)
    expect(await showAllResultsModalButton.isVisible()).toBe(false)
  })

  test('returns search results after entering text criteria', async () => {
    await searchInput.fill('admin')

    expect(await searchResultsContainer.isVisible()).toBe(true)

    await showAllResultsModalButton.waitFor()

    expect(await showAllResultsModalButton.isVisible()).toBe(true)
  })

  test('allows selection of different locations', async () => {
    await locationSearchButton.click()

    await locationPickerModal.waitFor()

    expect(await setCurrentLocationButton.isVisible()).toBe(true)

    await locationSearchInput.fill(TEST_LOCATION)

    await specificLocationButton.waitFor()

    await specificLocationButton.click()

    await expect(locationSearchButton).toHaveText(TEST_LOCATION, { timeout: 5000 });
  })
})