import { Producer as Kproducer } from "node-rdkafka"
export class Producer {

    constructor() {
        console.log("Producer");
        this.init();
    }

    init() {

        const producer = new Kproducer({
            'client.id': 'kafka',
            'metadata.broker.list': 'localhost:9092',
            'compression.codec': 'gzip',
            'retry.backoff.ms': 200,
            'message.send.max.retries': 10,
            'socket.keepalive.enable': true,
            'queue.buffering.max.messages': 100000,
            'queue.buffering.max.ms': 1000,
            'batch.num.messages': 1000000,
            'dr_cb': true
        });

        producer.connect();

        producer.on('ready', function () {
            try {
                producer.produce(
                    'topic',
                    null,
                    Buffer.from('Awesome message'),
                    'Stormwind',
                    Date.now(),
                );
            } catch (err) {
                console.error('A problem occurred when sending our message');
                console.error(err);
            }
        });

        producer.on('event.error', function (err) {
            console.error('Error from producer');
            console.error(err);
        })

        producer.setPollInterval(100);
    }
}