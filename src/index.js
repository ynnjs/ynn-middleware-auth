const get = {
    body( ctx, name ) {
        return ctx.request && ctx.request.body && ctx.request.body[ name ] || false;
    },
    query( ctx, name ) {
        return ctx.query && ctx.query[ name ] || false;
    },
    header( ctx, name ) {
        return ctx.headers && ctx.headers[ name ] || false;
    },
    cookie( ctx, name ) {
        const value = ctx.cookies.get( name );
        return value || false;
    }
};

module.exports = ( param, prop, origins = [ 'body', 'query', 'header', 'cookie' ] ) => {
    return ( ctx, next ) => {
        for( const item of origins ) {
            const value = get[ item ]( ctx, param ); 
            if( value !== false ) {
                ctx[ prop ] = value;
                return next();
            }
        }
        return next();
    };
}
