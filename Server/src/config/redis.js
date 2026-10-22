import { createClient } from 'redis';

const redisclient = createClient({
    username: 'default',
    password: '2GweReqAWbL8wcH1g2UMrZQyY44iQIAC',
    socket: {
        host: 'common-rapturous-seashell-51810.db.redis.io',
        port: 16595
    }
});


export default redisclient;
