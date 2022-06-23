import { KafkaConsumer } from "node-rdkafka"
export class Consumer {

    id:number = 0;
    constructor(id:number) {
        console.log("Consumer");
        this.id = id;
        this.init();
    }

    init() {

        const consumer = new KafkaConsumer({
            'group.id': `kafka:${this.id}`,
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