import { trace, context } from '@opentelemetry/api';

export const loggerOptions = {
  pinoHttp: {
    level: 'info',
    formatters: {
      level: (label: string): { level: string } => ({ level: label }),
      log(object) {
        const span = trace.getSpan(context.active());
        if (!span) return { ...object };
        const { spanId, traceId } = trace
          .getSpan(context.active())
          ?.spanContext();
        return { ...object, data: { ...object.data, spanId, traceId } };
      },
    },
  },
  renameContext: 'source',
};
