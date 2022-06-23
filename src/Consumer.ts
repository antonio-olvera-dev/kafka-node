import { KafkaConsumer as Kconsumer } from "node-rdkafka"
export class Consumer {

    constructor() {
        console.log("Consumer");
        this.init();
    }

    init() {

        const consumer = new Kconsumer({
            'group.id': 'kafka',
            'metadata.broker.list': 'localhost:9092',
        }, {});

        consumer.connect();

        consumer
            .on('ready', function () {
                consumer.subscribe(['librdtesting-01']);
                consumer.consume();
            })
            .on('data', function (data: any) {
                console.log(data.value.toString());
            });
    }

}