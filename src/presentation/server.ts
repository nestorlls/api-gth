import express, { Router } from 'express';
import compression from 'compression';
import helmet from 'helmet';

interface IServer {
  port: number;
  apiname: string;
  routes: Router;
}

export class Server {
  private readonly app = express();
  private readonly port: number;
  private readonly apiname: string;
  private readonly routes: Router;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private serverListener: any;

  constructor(props: IServer) {
    const { port, apiname, routes } = props;
    this.port = port;
    this.apiname = apiname;
    this.routes = routes;
  }

  async start(): Promise<void> {
    this.app
      .use(express.json())
      .use(express.urlencoded({ extended: true }))
      .use(compression())
      .use(helmet());

    this.app.use(this.routes);

    this.serverListener = this.app.listen(this.port, () => {
      console.log(`Server running at http://localhost:${this.port}/${this.apiname}`);
    });
  }

  async stop(): Promise<void> {
    if (this.serverListener) {
      this.serverListener.close();
    }
  }
}
