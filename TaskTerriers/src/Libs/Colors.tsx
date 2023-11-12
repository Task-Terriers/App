export const BUColor = {
    red: '#cc0000',
    black: '#2D2926'
}

export const NeutralColor: { [key in `neutral-${0 & 10 & 20 & 30 & 40 & 50 & 60 & 70 & 80 & 90 & 95 & 100}`]: string } = {
    'neutral-0': '#000000',
    ['neutral-10']: '#232427',
    ['neutral-20']: '#47494e',
    ['neutral-30']: '#6a6d75',
    ['neutral-40']: '#8d919c',
    ['neutral-50']: '#b1b5c2',
    ['neutral-60']: '#c0c4cf',
    ['neutral-70']: '#d0d3db',
    ['neutral-80']: '#e0e2e7',
    ['neutral-85']: '#e9eaee',
    ['neutral-90']: '#eff0f3',
    ['neutral-100']: '#ffffff',
}

export const AlertColor = {
    ['alert-critical']: '#ff0000',
    ['alert-minor']: '#ffb800',
    ['alert-normal']: '#04eb04',
}

export declare namespace TypographyColorType {
    type Key = 'neutral-10' | 'neutral-40' | 'neutral-60' | 'neutral-100'
}

export declare namespace BackgroundColorType {
    type Value =
        | '#e0e2e7'
        | '#ff0000'
}

export declare namespace UniversalColorType {
    type Value =
        | '#cc0000'
        | '#000000'
        | '#232427'
        | '#47494e'
        | '#6a6d75'
        | '#8d919c'
        | '#b1b5c2'
        | '#c0c4cf'
        | '#d0d3db'
        | '#e0e2e7'
        | '#eff0f3'
        | '#ffffff'
        | '#ff0000'
        | '#ffb800'
        | 'transparent'
}
