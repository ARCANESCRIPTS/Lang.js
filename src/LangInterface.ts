interface LangInterface {

    // Getters & Setters //

    /**
     * Get the current locale.
     *
     * @return {string} The current locale.
     */
    getLocale() : string;

    /**
     * Set the current locale.
     *
     * @param  locale {string} The locale to set.
     */
    setLocale(locale: string);

    /**
     * Get the fallback locale being used.
     *
     * @return {string}
     */
    getFallback() : string;

    /**
     * Set the fallback locale being used.
     *
     * @param  fallback {string}  The fallback locale.
     */
    setFallback(fallback: string);

    /**
     * Set messages source.
     *
     * @param  messages  {object} The messages source.
     */
    setMessages(messages: any);

    /**
     * Check if the messages is not null.
     *
     * @returns {boolean}
     */
    hasMessages() : boolean;

    /**
     * Determine if a translation exists for a given locale.
     *
     * @param  {string}       key
     * @param  {string}  locale
     *
     * @return {boolean}
     */
    hasForLocale(key: string, locale: string) : boolean;

    /**
     * Check if the translation exists.
     *
     * @param  {string}       key
     * @param  {string|null}  locale
     * @param  {boolean}      fallback
     *
     * @return {boolean}
     */
    has(key, locale?: string, fallback?: boolean) : boolean;

    /**
     * Get the translation for a given key.
     *
     * @param  {string}       key
     * @param  {object}       replacements
     * @param  {string|null}  locale
     *
     * @return {string}
     */
    trans(key: string, replacements?: any, locale?: string) : string;

    /**
     * Get the translation for the given key.
     *
     * @param  {string}       key
     * @param  {object}       replacements
     * @param  {string|null}  locale
     * @param  {boolean}      fallback
     *
     * @return {string}
     */
    get(key, replacements?: any, locale?: string, fallback?: boolean) : string;
}

export default LangInterface;
