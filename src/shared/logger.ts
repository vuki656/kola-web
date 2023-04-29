import pino from 'pino'

export const logger = pino({
    mixin: (_, level) => {
        return {
            severity: pino.levels.labels[level].toUpperCase(),
        }
    },
})
