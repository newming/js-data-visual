const arrayUtils = {
    append(array, ...elements) {
        array.push(...elements)

        return array
    },

    prepend(array, ...elements) {
        array.unshift(...elements)

        return array
    },

    insert(array, index, ...elements) {
        array.splice(index, 0, ...elements)

        return array
    },

    remove(array, index) {
        array.splice(index, 1)

        return array
    }
}