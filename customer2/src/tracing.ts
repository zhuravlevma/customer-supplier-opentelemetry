import { CompositePropagator } from '@opentelemetry/core';
import { BatchSpanProcessor } from '@opentelemetry/sdk-trace-base';
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-http';
import { PrometheusExporter } from '@opentelemetry/exporter-prometheus';

import { getNodeAutoInstrumentations } from '@opentelemetry/auto-instrumentations-node';
import { JaegerPropagator } from '@opentelemetry/propagator-jaeger';
import { NodeSDK } from '@opentelemetry/sdk-node';
import { AsyncLocalStorageContextManager } from '@opentelemetry/context-async-hooks';
import { KafkaJsInstrumentation } from 'opentelemetry-instrumentation-kafkajs';

const otelSDK = new NodeSDK({
  metricReader: new PrometheusExporter({ port: 9466 }),
  serviceName: 'customer2',
  spanProcessor: new BatchSpanProcessor(
    new OTLPTraceExporter(
      new OTLPTraceExporter({
        url: 'localhost:6832',
      }),
    ),
  ),
  contextManager: new AsyncLocalStorageContextManager(),
  textMapPropagator: new CompositePropagator({
    propagators: [new JaegerPropagator()],
  }),
  instrumentations: [
    getNodeAutoInstrumentations(),
    new KafkaJsInstrumentation(),
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
