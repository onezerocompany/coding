import * as express from 'express';

export async function serve() {
  const app = express();

  app.get('*', (_, res) => {
    res.send('Hello, world!');
  });

  app.listen(3000, () => {
    console.log('Server is listening on port 3000');
  });
}
