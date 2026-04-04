import { expect, test } from '@playwright/test'

test.describe('chat shell', () => {
  test('shows the empty chat state before a chat is selected', async ({ page }) => {
    await page.goto('/')

    await expect(page.getByText('Choose a user or group to chat with')).toBeVisible()
    await expect(page.getByPlaceholder('Write a message...')).toBeVisible()
    await expect(page.getByRole('button', { name: 'Send message' })).toBeDisabled()
  })
})