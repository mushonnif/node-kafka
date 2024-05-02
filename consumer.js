import { Kafka } from 'kafkajs';

const kafka = new Kafka({
    brokers: ['localhost:9092']
});

const consumer = kafka.consumer({
    groupId: 'nodejs'
});

await consumer.subscribe({
    topic: 'helloworld',
    fromBeginning: true
});

await consumer.connect();

await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
        console.log({
            partition,
            offset: message.offset,
            value: message.value.toString(),
        });
    },
});
