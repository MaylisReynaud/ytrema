export const newDate = (date) => {
    return new Date(date).toISOString().replace(/T.*/, '').split('-').reverse().join('-')
};