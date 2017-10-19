const UNITS = {
    CURRENCY: {
        DE: 'EURO',
        GB: 'POUNDS',
        US: 'USD',
    },
    METRIC: {
        DISTANCE: 'KM',
        WEIGHT: 'KG',
    },
    IMPERIAL: {
        DISTANCE: 'MILES',
        WEIGHT: 'TONS',
    }
};

const COUNTRIES = {
    DE: 'DE',
    GB: 'GB',
    US: 'US',
};

const SYSTEMS = {
    METRIC: 'METRIC',
    IMPERIAL: 'IMPERIAL',
};

let user = {
    country: COUNTRIES.DE,
    system: SYSTEMS.METRIC,
};