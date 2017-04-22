import Lang from "../dist/Lang";
import messages from "./fixtures/messages";

describe('#getLocale()', () => {
    it('Can instantiate the Lang class with default locale', () => {
        let lang = new Lang({
            locale: 'fr'
        });

        expect(lang.getLocale()).toBe('fr');
    });

    it('Should get the default locale from the DOM', () => {
        let lang = new Lang;

        document.documentElement.lang = 'en';

        expect(lang.getLocale()).toBe('en');
    });

    it('Can set and get the locale', () => {
        let lang = new Lang;

        lang.setLocale('fr');

        expect(lang.getLocale()).toBe('fr');

        lang.setLocale('es');

        expect(lang.getLocale()).toBe('es');
    });
});

describe('#getFallback()', () => {
    it('Should get the default locale from the DOM', () => {
        let lang = new Lang;

        expect(lang.getFallback()).toBe('en');
    });

    it('Can set and get the fallback', () => {
        let lang = new Lang;

        lang.setFallback('fr');

        expect(lang.getFallback()).toBe('fr');

        lang.setFallback('es');

        expect(lang.getFallback()).toBe('es');
    });
});

describe('#hasMessages()', () => {
    it('Can instantiate the class with messages', () => {
        let lang = new Lang;

        expect(lang.hasMessages()).toBe(false);

        lang = new Lang({
            messages: {} // Empty
        });

        expect(lang.hasMessages()).toBe(false);

        lang = new Lang({
            messages
        });

        expect(lang.hasMessages()).toBe(true);
    });
});

describe('#has()', () => {
    it('can check if it has translation', () => {
        let lang = new Lang({messages});

        expect(lang.has('greetings.hi')).toBe(true);

        expect(lang.has('auth.password')).toBe(false);
    });

    it('can check if it has translation for a specific locale with fallback', () => {
        let lang = new Lang({messages});

        expect(lang.has('greetings.hi', 'en')).toBe(true);
        expect(lang.has('greetings.hi', 'fr')).toBe(true);
        expect(lang.has('greetings.hi', 'it')).toBe(true);
    });

    it('Can check if it has translation for a specific locale without fallback', () => {
        let lang = new Lang({messages});

        expect(lang.has('greetings.hi', 'en', false)).toBe(true);
        expect(lang.has('greetings.hi', 'fr', false)).toBe(true);
        expect(lang.has('greetings.hi', 'it', false)).toBe(false);
    });
});

describe('#hasForLocale()', () => {
    it('Can check has translation for a given local (without fallback)', () => {
        let lang = new Lang({messages});

        expect(lang.hasForLocale('actions.delete', 'en')).toBe(true);
        expect(lang.hasForLocale('actions.delete', 'fr')).toBe(true);

        expect(lang.hasForLocale('actions.update', 'en')).toBe(true);
        expect(lang.hasForLocale('actions.update', 'fr')).toBe(false);
    });
});

describe('#get()', () => {
    it('Should return the given key if the messages not set', () => {
        let lang = new Lang();

        expect(lang.get('greetings.hi')).toBe('greetings.hi');
    });

    it('Can get the correct translation', () => {
        let lang = new Lang({messages});

        expect(lang.get('greetings.hi')).toBe('Hi !');

        lang.setLocale('fr');

        expect(lang.get('greetings.hi')).toBe('Salut !');

        lang.setLocale('en');

        expect(lang.get('greetings.hi')).toBe('Hi !');
    });

    it('Can get the translation with fallback', () => {
        let lang = new Lang({messages});

        expect(lang.get('greetings.hi')).toBe('Hi !');

        lang.setLocale('it');

        expect(lang.get('greetings.hi')).toBe('Hi !');
    });

    it('Can get the translation with replacement', () => {
        let lang        = new Lang({messages}),
            replacement = {"name": "ARCANEDEV"};

        expect(lang.get('greetings.hello', replacement)).toBe('Hello, ARCANEDEV !');

        lang.setLocale('fr');

        expect(lang.get('greetings.hello', replacement)).toBe('Salut, ARCANEDEV !');

        // Without replacement
        lang.setLocale('en');

        expect(lang.get('greetings.hello')).toBe('Hello, :name !');
    });

    it('Get the translation with replacement and locale specified', () => {
        let lang        = new Lang({messages}),
            replacement = {"name": "ARCANEDEV"};

        expect(lang.get('greetings.hello', replacement, 'en')).toBe('Hello, ARCANEDEV !');
        expect(lang.get('greetings.hello', replacement, 'fr')).toBe('Salut, ARCANEDEV !');
        expect(lang.get('greetings.hello', replacement, 'it')).toBe('Hello, ARCANEDEV !');
    });

    it('Get the translation with replacement and locale specified without fallback', () => {
        let lang        = new Lang({messages}),
            replacement = {"name": "ARCANEDEV"};

        expect(lang.get('greetings.hello', replacement, 'en', false)).toBe('Hello, ARCANEDEV !');
        expect(lang.get('greetings.hello', replacement, 'fr', false)).toBe('Salut, ARCANEDEV !');
        expect(lang.get('greetings.hello', replacement, 'it', false)).toBe('greetings.hello');
    });

    it('Should ignore the translation with invalid key', () => {
        expect(() => {
            let lang = new Lang({messages});

            lang.get();
        }).toThrowError('The key must be a [string] type, [undefined] was given.');

        expect(() => {
            let lang = new Lang({messages});

            lang.get(true);
        }).toThrowError('The key must be a [string] type, [boolean] was given.');
    });
});

describe('#trans()', () => {
    it('Can get the correct translation', () => {
        let lang = new Lang({messages});

        expect(lang.trans('greetings.hi')).toBe('Hi !');

        lang.setLocale('fr');

        expect(lang.trans('greetings.hi')).toBe('Salut !');

        lang.setLocale('en');

        expect(lang.trans('greetings.hi')).toBe('Hi !');
    });

    it('Can get the translation with fallback', () => {
        let lang = new Lang({messages});

        expect(lang.trans('greetings.hi')).toBe('Hi !');

        lang.setLocale('it');

        expect(lang.trans('greetings.hi')).toBe('Hi !');
    });

    it('Can get the translation with replacement', () => {
        let lang        = new Lang({messages}),
            replacement = {"name": "ARCANEDEV"};

        expect(lang.trans('greetings.hello', replacement)).toBe('Hello, ARCANEDEV !');

        lang.setLocale('fr');

        expect(lang.trans('greetings.hello', replacement)).toBe('Salut, ARCANEDEV !');

        // Without replacement
        lang.setLocale('en');

        expect(lang.trans('greetings.hello')).toBe('Hello, :name !');
    });

    it('Get the translation with replacement and locale specified', () => {
        let lang        = new Lang({messages}),
            replacement = {"name": "ARCANEDEV"};

        expect(lang.trans('greetings.hello', replacement, 'en')).toBe('Hello, ARCANEDEV !');
        expect(lang.trans('greetings.hello', replacement, 'fr')).toBe('Salut, ARCANEDEV !');
        expect(lang.trans('greetings.hello', replacement, 'it')).toBe('Hello, ARCANEDEV !');
    });
});