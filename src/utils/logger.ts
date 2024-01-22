import pino from 'pino'

export const logger = pino({
    transport: {
        targets: [
            {
                target: 'pino-pretty',
                options: {},
                level: 'debug',
            },
            {
                target: 'pino-sentry-transport',
                options: {
                    withLogRecord: true, // default false - send the log record to sentry as a context.(if its more then 8Kb Sentry will throw an error)
                    minLevel: 40, // which level to send to sentry
                    sentry: {
                        dsn: process.env.SENTRY_DSN,
                    },
                },
                level: 'error',
            },
        ],
    },
})