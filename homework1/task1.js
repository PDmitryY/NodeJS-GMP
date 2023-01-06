import { Transform, pipeline} from 'stream';

const input = process.stdin;
const output = process.stdout;

const transform = async () => {
  const transformation = new Transform({
    transform(chunk, enc, cb){
      const reversedInput = chunk.toString().trim().split('').reverse().join('');
      cb(null, reversedInput + '\n')
    }
  });
  pipeline(
    input,
    transformation,
    output,
    (err) => console.log(err)
  )
}

await transform();