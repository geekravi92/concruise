import { Injectable, OnApplicationShutdown } from "@nestjs/common";
import { Consumer, ConsumerRunConfig, ConsumerSubscribeTopics, Kafka } from "kafkajs";

const KAFKA_BROKER = "localhost:9092";
const CONSUMER_GROUP_ID = "concruise";

@Injectable()
export class ConsumerService implements OnApplicationShutdown {
    private readonly kafka = new Kafka({
        brokers: [KAFKA_BROKER]
    });

    private readonly consumers: Consumer[] = [];

    async consume(topic: ConsumerSubscribeTopics, consumerGroupPrefix: string, config: ConsumerRunConfig) {
        const consumer = this.kafka.consumer({
            groupId: CONSUMER_GROUP_ID + consumerGroupPrefix
        });
        await consumer.connect();
        await consumer.subscribe(topic);
        await consumer.run(config);
        this.consumers.push(consumer);
    }

    async onApplicationShutdown(signal?: string) {
        for(const consumer of this.consumers) {
            await consumer.disconnect();
        }
    }
}