const Ynn = require( 'ynn' );
const hierarchicalParam = require( '../src' );

async function create() {
    const app = new Ynn( {
        root : __dirname,
        debugging : Ynn.DEBUGGING_DANGER,
        logging : false
    } );
    app.use( hierarchicalParam( ...arguments ) );
    return app;
}


describe( 'ynn-middleware-hierarchical-param', () => {

    it( 'empty', async done => {
        const app = await create( 'param', 'prop' );
        app.use( ( ctx, next ) => {
            expect( ctx ).not.toHaveProperty( 'prop' );
            ctx.body = '';
            done();
            return next();
        } );
        app.sham( '/' ).catch( e => app.console.error( e ) );
    } );

    it( 'set in header', async done => {
        const app = await create( 'param', 'prop' );
        app.use( ( ctx, next ) => {
            expect( ctx ).toHaveProperty( 'prop', 'header' );
            ctx.body = '';
            done();
            return next();
        } );
        app.sham( '/', {
            headers : {
                param : 'header'
            }
        } ).catch( e => app.console.error( e ) );
    } );

    it( 'set in cookie', async done => {
        const app = await create( 'param', 'prop' );
        app.use( ( ctx, next ) => {
            expect( ctx ).toHaveProperty( 'prop', 'cookie' );
            ctx.body = '';
            done();
            return next();
        } );
        app.sham( '/', {
            cookies : {
                param : 'cookie'
            }
        } ).catch( e => app.console.error( e ) );
    } );

    it( 'set in post body', async done => {
        const app = await create( 'param', 'prop' );
        app.use( ( ctx, next ) => {
            expect( ctx ).toHaveProperty( 'prop', 'post' );
            ctx.body = '';
            done();
            return next();
        } );
        app.sham( '/', {
            method : 'POST',
            body : {
                param : 'post'
            }
        } ).catch( e => app.console.error( e ) );

    } );

    it( 'set in query string', async done => {
        const app = await create( 'param', 'prop' );
        app.use( ( ctx, next ) => {
            expect( ctx ).toHaveProperty( 'prop', 'get' );
            ctx.body = '';
            done();
            return next();
        } );
        app.sham( '/', {
            qs : {
                param : 'get'
            }
        } ).catch( e => app.console.error( e ) );

    } );

    it( 'specifying origins', async done => {
        const app = await create( 'param', 'prop', [ 'header' ] ); 
        app.use( ( ctx, next ) => {
            expect( ctx ).not.toHaveProperty( 'prop' );
            ctx.body = '';
            done();
            return next();
        });

        app.sham( '/', {
            qs : {
                param : 'get'
            }
        } ).catch( e => app.console.error( e ) );
    } );

    it( 'different priority', async done => {
        const app = await create( 'param', 'prop', [ 'cookie', 'header' ] ); 
        app.use( ( ctx, next ) => {
            expect( ctx ).toHaveProperty( 'prop', 'cookie' );
            ctx.body = '';
            done();
            return next();
        });

        app.sham( '/', {
            cookies : {
                param : 'cookie'
            },
            headers : {
                param : 'header'
            }
        } ).catch( e => app.console.error( e ) );
    } );
} );
