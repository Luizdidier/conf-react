import registry from './registry';

/**
 * Looks up the provider in the registry.
 *
 * @param {string} provider - The provider to be looked up.
 * @returns {class}
 */
export default function lookup(provider) {
  return registry[provider];
}
