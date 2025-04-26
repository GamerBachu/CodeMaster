type Resource = Record<string, string>;

import enUS from '../resources/en-us.json';
import frFR from '../resources/fr-fr.json';

const resources: Record<string, Resource> = { 'en-US': enUS, 'fr-FR': frFR };

const useTranslation = (locale = 'en-US') => {

    const translate = (key: string): string => {
        
        const resource = resources[locale];
        if (resource && resource[key]) {
            return  '♠'+ resource[key];
        }
        return '♣'+key;
    };

    const t = translate;

    return t;
};

export default useTranslation; 

export { enUS };


