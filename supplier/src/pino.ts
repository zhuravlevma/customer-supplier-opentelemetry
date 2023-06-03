import Pino, { Logger } from 'pino';
import { LoggerOptions } from 'pino';
import { trace, context } from '@opentelemetry/api';

export const loggerOptions: LoggerOptions = {
  formatters: {
    log(object) {
      const span = trace.getSpan(context.active());
      if (!span) return { ...object };
      const { spanId, traceId } = trace
        .getSpan(context.active())
        ?.spanContext();

      console.log({ ...object, spanId, traceId });

      return { ...object, spanId, traceId };
    },
  },
};

export const logger: Logger = Pino(loggerOptions);
