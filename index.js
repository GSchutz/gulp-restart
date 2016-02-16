var spawn = require('child_process').spawn;

// FIXME: Don't know why this don't work
// var process.stdin.resume();

// process.on('SIGINT', function() {
//   console.log('Closed ' + process.pid);

//   process.exit();
// });

var stdin = process.stdin;

// console.log(stdin);
// console.log(stdin.constructor.name);

// without this, we would only get streams once enter is pressed
stdin.setRawMode( true );

// resume stdin in the parent process (node app won't quit all by itself
// unless an error or process.exit() happens)
stdin.resume();

// i don't want binary, do you?
stdin.setEncoding( 'utf8' );

function exit( key ){
  // ctrl-c ( end of text )
  if ( key === '\u0003' ) {
    process.stdout.write( "exit process " + process.pid + "\n" );
    process.exit();
  }
}

// on any data into stdin
stdin.on('data', exit);

function spawnChildren(e) {

  process.stdin.removeAllListeners('data');
  process.stdin.pause();

  p = spawn('gulp', process.argv.slice(2), {stdio: [process.stdin, process.stdout, process.stderr], detached: true});

  process.exit();
}

module.exports = spawnChildren;
