import { createConnection } from 'typeorm';
import { apolloServer, httpServer } from './express'

import ormconfig from "./postgres/ormconfig";

const badExit = (e: unknown) => {
    console.error(e);
    process.exit(1);
};

const bootstrap = async () => {
    if (process.env.NODE_ENV === 'local') {
        const delay = ms => new Promise(resolve => setTimeout(resolve, ms))

        await delay(5000)
        console.log('local dev race condition delay...')
    }

    try {
        await createConnection(ormconfig).catch(badExit);
        apolloServer.listen().then(({ url }) => {
            console.log(`Apollo: ${url}`);
        });
        httpServer.listen(5001, () => console.log("HTTP Server: http://localhost:5001"))
    } catch (e) {
        badExit(e);
    }
};



bootstrap()