import { LogMiddleware } from './routes/middleware/log.middleware';
import bodyParser from 'body-parser';
import { createExpressServer } from 'routing-controllers';
import { TestController } from './routes/controller/test.controller';
import { createConnection } from 'typeorm';
import { port } from './config/server';
createConnection()
  .then((connection) => {
    const app = createExpressServer({
      controllers: [TestController],
      middlewares: [LogMiddleware],
      routePrefix: '/service',
    });

    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());

    app.listen(port, () => {
      // tslint:disable-next-line:no-console
      console.log('Hello world listen in port : ' + port);
    });
  })
  .catch((err) => {
    // tslint:disable-next-line:no-console
    console.log(err);
  });
