import { Consumer } from './Consumer';
import { Producer } from './Producer';

const port: string = process.argv[process.argv.length - 1];

if (port === "8080") {
    const producer = new Producer();
}
if (port === "8081") {
    const consumer = new Consumer(1);
}
if (port === "8082") {
    const consumer = new Consumer(2);
}