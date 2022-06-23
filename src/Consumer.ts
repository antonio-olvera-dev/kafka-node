import { KafkaConsumer } from "node-rdkafka"
export class Consumer {

    constructor() {
        console.log("Consumer");
        this.init();
    }

    init() {

        const consumer = new KafkaConsumer({
            'group.id': 'kafka',
            'metadata.broker.list': 'localhost:9092',
        }, {});

        consumer.connect();

        consumer
            .on('ready', function () {
                consumer.subscribe(['test']);
                // consumer.consume();
                setInterval(() => {
                    consumer.consume(1);
                }, 800);
            })
            .on('data', function (data: any) {
                console.log(data.value.toString());
            });
    }

}