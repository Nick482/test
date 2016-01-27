/**
 * Created by Nick on 1/26/2016.
 */
module.exports = {
    client: 'postgresql',
    connection: {
        host     : '127.0.0.1',
        user     : 'postgres',
        password : '5557600',
        database : 'test',
        pool: {
            min: 0,
            max: 7
        },
        charset  : 'utf8'
    }
};