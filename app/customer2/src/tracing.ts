import { CompositePropagator } from '@opentelemetry/core';
import { BatchSpanProcessor } from '@opentelemetry/sdk-trace-base';
import { PrometheusExporter } from '@opentelemetry/exporter-prometheus';
import { PinoInstrumentation } from '@opentelemetry/instrumentation-pino';

import { JaegerPropagator } from '@opentelemetry/propagator-jaeger';
import { NodeSDK } from '@opentelemetry/sdk-node';
import { AsyncLocalStorageContextManager } from '@opentelemetry/context-async-hooks';
import { KafkaJsInstrumentation } from 'opentelemetry-instrumentation-kafkajs';
import { JaegerExporter } from '@opentelemetry/exporter-jaeger';
import { NestInstrumentation } from '@opentelemetry/instrumentation-nestjs-core';
import { ExpressInstrumentation } from '@opentelemetry/instrumentation-express';
import { HttpInstrumentation } from '@opentelemetry/instrumentation-http';

const otelSDK = new NodeSDK({
  metricReader: new PrometheusExporter({ port: 9466 }),
  serviceName: 'customer2',
  spanProcessor: new BatchSpanProcessor(
    new JaegerExporter({
      endpoint: 'http://tempo:14268/api/traces',
    }),
  ),
  contextManager: new AsyncLocalStorageContextManager(),
  textMapPropagator: new CompositePropagator({
    propagators: [new JaegerPropagator()],
  }),
  instrumentations: [
    new HttpInstrumentation(),
    new NestInstrumentation(),
    new ExpressInstrumentation(),
    new KafkaJsInstrumentation(),
    new PinoInstrumentation(),
  ],
});

export default otelSDK;

// You can also use the shutdown method to gracefully shut down the SDK before process shutdown
// or on some operating system signal.
process.on('SIGTERM', () => {
  otelSDK
    .shutdown()
    .then(
      () => console.log('SDK shut down successfully'),
      (err) => console.log('Error shutting down SDK', err),
    )
    .finally(() => process.exit(0));
});
