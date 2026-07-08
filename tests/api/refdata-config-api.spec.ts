import { test, expect } from '../../src/fixtures/baseFixture';
import { URLs } from '../../constants/urls';
import Ajv from 'ajv';
import addFormats from 'ajv-formats';
import schema from '../../data/schema/refdata-config.schema.json';
import expectedResponse from '../../data/responses/refdata-config-response.json';

const ajv = new Ajv({ allErrors: true, strict: false });
addFormats(ajv);
const validateRefdataConfig = ajv.compile(schema);

function isDnsResolutionError(error: unknown): boolean {
  const message = error instanceof Error ? error.message : String(error);
  return /ENOTFOUND|EAI_AGAIN|getaddrinfo/i.test(message);
}

test.describe('Refdata Config API', () => {
  test('should validate the refdata fixture against the schema', async () => {
    const isFixtureValid = validateRefdataConfig(expectedResponse);
    expect(
      isFixtureValid,
      `Fixture schema validation failed: ${JSON.stringify(validateRefdataConfig.errors)}`
    ).toBeTruthy();
  });

  test('should return 200 and a schema-valid response contract', async ({ apiHelper, logger }) => {
    logger.info('Calling refdata config API');

    let response;
    try {
      response = await apiHelper.getRefdataConfig(URLs.apiRefdataConfig);
    } catch (error) {
      test.skip(isDnsResolutionError(error), 'Skipping live API assertion: core-api.mb.io is not reachable from this environment.');
      throw error;
    }

    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);

    const body = await response.json();

    const isSchemaValid = validateRefdataConfig(body);
    expect(
      isSchemaValid,
      `Schema validation failed: ${JSON.stringify(validateRefdataConfig.errors)}`
    ).toBeTruthy();

    expect(Array.isArray(body.supportedLanguages)).toBeTruthy();
    expect(body.supportedLanguages.length).toBeGreaterThan(0);
    expect(Array.isArray(body.supportedQuotes)).toBeTruthy();
    expect(body.supportedQuotes.length).toBeGreaterThan(0);
  });
});
