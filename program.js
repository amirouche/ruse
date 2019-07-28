|(flatten-begin
   (begin
     (pk '42)
     (begin (pk '42) (begin '42 (pk '42)))
     (begin '42 (pk '42))
     (pk '42)))
|(begin
   (pk '42)
   (begin (pk '42) (begin '42 (pk '42)))
   (begin '42 (pk '42))
   (pk '42))
(function( k ) {  return (function( k ) {  return k ( (function( k, t_3 ) {  return (function( k ) {  return (function( k ) {  return k ( (function( k, t_4 ) {  return (function( k ) {  return (function( k ) {  return k ( (function( k, t_5 ) {  return (function( k ) {  return (function( k ) {  return k ( 42 ) ;}) ( (function( v0 ) {  return k ( pk ( v0 ) ) ;}) ) ;}) ( k ) ;}) ) ;}) ( (function( v0 ) {  return (function( k ) {  return (function( k ) {  return k ( (function( k, t_0 ) {  return (function( k ) {  return (function( k ) {  return k ( 42 ) ;}) ( (function( v0 ) {  return k ( pk ( v0 ) ) ;}) ) ;}) ( k ) ;}) ) ;}) ( (function( v0 ) {  return (function( k ) {  return k ( 42 ) ;}) ( (function( v ) {  return (function(  ) {  return v0 ( k, (function( k ) {  return k ( v ) ;}) ) ;}) ;}) ) ;}) ) ;}) ( (function( v ) {  return (function(  ) {  return v0 ( k, (function( k ) {  return k ( v ) ;}) ) ;}) ;}) ) ;}) ) ;}) ( k ) ;}) ) ;}) ( (function( v0 ) {  return (function( k ) {  return (function( k ) {  return k ( (function( k, t_2 ) {  return (function( k ) {  return (function( k ) {  return k ( (function( k, t_1 ) {  return (function( k ) {  return (function( k ) {  return k ( 42 ) ;}) ( (function( v0 ) {  return k ( pk ( v0 ) ) ;}) ) ;}) ( k ) ;}) ) ;}) ( (function( v0 ) {  return (function( k ) {  return k ( 42 ) ;}) ( (function( v ) {  return (function(  ) {  return v0 ( k, (function( k ) {  return k ( v ) ;}) ) ;}) ;}) ) ;}) ) ;}) ( k ) ;}) ) ;}) ( (function( v0 ) {  return (function( k ) {  return (function( k ) {  return k ( 42 ) ;}) ( (function( v0 ) {  return k ( pk ( v0 ) ) ;}) ) ;}) ( (function( v ) {  return (function(  ) {  return v0 ( k, (function( k ) {  return k ( v ) ;}) ) ;}) ;}) ) ;}) ) ;}) ( (function( v ) {  return (function(  ) {  return v0 ( k, (function( k ) {  return k ( v ) ;}) ) ;}) ;}) ) ;}) ) ;}) ( k ) ;}) ) ;}) ( (function( v0 ) {  return (function( k ) {  return (function( k ) {  return k ( 42 ) ;}) ( (function( v0 ) {  return k ( pk ( v0 ) ) ;}) ) ;}) ( (function( v ) {  return (function(  ) {  return v0 ( k, (function( k ) {  return k ( v ) ;}) ) ;}) ;}) ) ;}) ) ;})
