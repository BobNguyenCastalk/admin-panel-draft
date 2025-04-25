import { URL_LIST } from "@data/url";
import type { Page } from "@playwright/test";

import { BasePage } from "./basePage";

export class ConfigurationPage extends BasePage {
  constructor(
    page: Page,
    readonly pluginsButton = page.locator("[data-test-id*='plugins']"),
    readonly permissionGroupsButton = page.locator("[data-test-id*='permission-groups']"),
    readonly staffMembersButton = page.locator("[data-test-id*='staff members']"),
    readonly channelsButton = page.locator("[data-test-id*='channels']"),
    readonly webhooksAndEventsButton = page.locator("[data-test-id*='webhooks']"),
    readonly pageTypesButton = page.locator("[data-test-id*='configuration-menu-page-type']"),
    readonly taxesButton = page.locator("[data-test-id*='configuration-menu-taxes']"),
  ) {
    super(page);
  }

  async openTaxes() {
    await this.taxesButton.click();
  }

  async openChannels() {
    await this.channelsButton.click();
  }

  async openPermissionGroups() {
    await this.permissionGroupsButton.click();
  }

  async openStaffMembers() {
    await this.staffMembersButton.click();
  }

  async openPageTypes() {
    await this.pageTypesButton.click();
  }

  async openPlugins() {
    await this.pluginsButton.click();
  }

  async goToConfigurationView() {
    await this.page.goto(URL_LIST.configuration);
  }

  async openWebhooksAndEvents() {
    await this.webhooksAndEventsButton.click();
  }
}
