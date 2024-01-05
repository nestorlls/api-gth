import express, { Router } from 'express';
import compression from 'compression';
import helmet from 'helmet';

interface IServer {
  port: number;
  apiUrl: string;
  routes: Router;
}

export class Server {
  private readonly app = express();
  private readonly port: number;
  private readonly apiUrl: string;
  private readonly routes: Router;
  private serverListener: any;

  constructor(props: IServer) {
    const { port, apiUrl, routes } = props;
    this.port = port;
    this.apiUrl = apiUrl;
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
      console.log(`Server running at http://localhost:${this.port}${this.apiUrl}`);
    });
  }

  async stop(): Promise<void> {
    if (this.serverListener) {
      this.serverListener.close();
    }
  }
}
