import express, {Application} from 'express';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import compression from 'compression';

// const port = process.env.PORT

const mount = async (app: Application) => {
  app.use(bodyParser.json({ limit: "2mb" }));
  // app.use(cookieParser(process.env.COOKIE_SECRET));
  app.use(compression());

  app.get('/', (req, res) => res.send('hello world'));

  app.listen(4000, () => {
    console.log('listening on port 4000')
  });

}

mount(express());