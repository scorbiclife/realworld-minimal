/**
 * @typedef {import("./Tag").Tag} Tag
 */

/**
 * @param {string} tagString 
 * @returns {Tag}
 */
export function tagOf(tagString) {
    return /** @type {Tag} */ (tagString);
}