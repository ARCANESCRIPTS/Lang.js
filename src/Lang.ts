///<reference path="../typings/modules/lodash/index.d.ts"/>
import _ from 'lodash';
import LangInterface from './LangInterface';

/**
 * The Lang Class
 */
class Lang implements LangInterface {
    // Properties //

    protected locale: string;
    protected fallback: string;
    protected messages: any;

    // Constructor //

    /**
     * @param  {object}  options
     */
    public constructor(options: any = {}) {
        this.setLocale(options.locale);
        this.setFallback(options.fallback);
        this.setMessages(options.messages);
    }

    // Getters & Setters //

    /**
     * Get the current locale.
     *
     * @return {string} The current locale.
     */
    public getLocale() : string {
        return this.locale;
    }

    /**
     * Set the current locale.
     *
     * @param  locale {string} The locale to set.
     */
    public setLocale(locale: string) {
        this.locale = this.getDefaultLocale(locale);
    }

    /**
     * Get the fallback locale being used.
     *
     * @return {string}
     */
    public getFallback() : string {
        return this.fallback;
    }

    /**
     * Set the fallback locale being used.
     *
     * @param  fallback {string}  The fallback locale.
     *
     * @return void
     */
    public setFallback(fallback: string) {
        this.fallback = this.getDefaultLocale(fallback);
    }

    /**
     * Set messages source.
     *
     * @param  messages  {object} The messages source.
     */
    public setMessages(messages: any) {
        this.messages = messages;
    }

    // Main Methods //

    /**
     * Check if the messages is not null.
     *
     * @returns {boolean}
     */
    public hasMessages() : boolean {
        if (this.messages === null || this.messages === undefined)
            return false;

        return Object.keys(this.messages).length > 0;
    }

    /**
     * Determine if a translation exists for a given locale.
     *
     * @param  {string}  key
     * @param  {string}  locale
     *
     * @return {boolean}
     */
    public hasForLocale(key: string, locale: string) : boolean {
        return this.has(key, locale, false);
    }

    /**
     * Check if the translation exists.
     *
     * @param  {string}       key
     * @param  {string|null}  locale
     * @param  {boolean}      fallback
     *
     * @return {boolean}
     */
    public has(key: string, locale: string = null, fallback: boolean = true) : boolean {
        return this.get(key, {}, locale, fallback) !== key;
    }

    /**
     * Get the translation for a given key.
     *
     * @param  {string}       key
     * @param  {object}       replacements
     * @param  {string|null}  locale
     *
     * @return {string}
     */
    public trans(key: string, replacements: any = {}, locale: string = null) : string {
        return this.get(key, replacements, locale);
    }

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
    public get(key: string, replacements: any = {}, locale: string = null, fallback: boolean = true) : string {
        if (typeof key !== 'string')
            throw new Error(`The key must be a [string] type, [${typeof key}] was given.`);

        if ( ! this.hasMessages())
            return key;

        let message = this.getMessage(key, locale, fallback);

        if (typeof message === 'string' && replacements)
            message = this.applyReplacements(message, replacements);

        return message;
    }

    // Other Methods //

    /**
     * @private
     *
     * @param  {string|null}  locale
     *
     * @return {string}
     */
    private getDefaultLocale(locale: any) {
        return locale || document.documentElement.lang || 'en';
    }

    /**
     * @private
     *
     * @param  {string}   key
     * @param  {string}   locale
     * @param  {boolean}  fallback
     *
     * @return {string}
     */
    private getMessage(key: string, locale: string, fallback: boolean) : string {
        let currentLocale = locale || this.getLocale();

        if (this.hasMessagesForLocale(locale) && ! fallback)
            return key;

        let message = _.get(this.messages[currentLocale], key, key);

        return (message === key && fallback === true)
            ? _.get(this.messages[this.getFallback()], key, key)
            : message;
    }

    /**
     * Check if the given locale has messages.
     * 
     * @param  {string}  locale 
     * 
     * @return {boolean}
     */
    private hasMessagesForLocale(locale: string) : boolean {
        return this.hasMessages() && this.messages[locale] === undefined;
    }

    /**
     * @private
     *
     * @param  {string}  message
     * @param  {object}  replacements
     *
     * @returns {string}
     */
    private applyReplacements(message: string, replacements: any) : string {
        _.forEach(replacements, (replacement, key) => {
            message = message.replace(new RegExp(`:${key}`, 'g'), replacement);
        });

        return message;
    };
}

export default Lang;
