export const getRandomInteger = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const getRandomIntegerFromArray = (array) => {
    const min = 0
    const max = array.length - 1;
    const integer = array[Math.floor(Math.random() * (max - min + 1)) + min];
    return integer;
}

export const sort = (array) => {
    return array.sort(function(a, b){return a-b})
}

export const hasDuplicates = (array) => {
    return new Set(array).size < array.length;
}

export const alreadyExists = (current, arrays) => {
    return new Set([current.toString(),...arrays.map(array=>array.toString())]).size === arrays.length;
}