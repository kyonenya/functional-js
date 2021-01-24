import { left, right, map, flatten, Either, Left, Right } from 'fp-ts/lib/Either';
{
let l;

//const decode = (url: string): Either<never, string>|Either<string, never> => {
const decode = (url: string): Either<never, string>|Either<string, never> => {
  try {
    return right(decodeURIComponent(url));
  } catch (err) {
    return left(err.toString());
  }
};

const logger = map(console.log);
const dubler = map((x: number) => x * 2);
const decoder = map(decode);

//logger(dubler((right(123)))); // 246
const dubled: Either<never, number> = dubler((right(123)));
const logged: Either<never, void> = logger(dubler((right(123))));

//l = flatten(decoder(right('valid%3Fid%3D')));
const decoded: Either<never, Left<never>|Right<string>|Left<string>|Right<never>>
  = decoder(right('valid%3Fid%3D'));
const flattended: Either<string, string> = flatten(decoder(right('valid%3Fid%3D')));

//l = flatten(decoder(right('invalid3s%%F%'))); // = { _tag: 'Left', left: 'URIError: URI malformed' }
const right2: Either<never, string> = right('invalid3s%%F%');
const decoded2: Either<never, Left<never>|Right<string>|Left<string>|Right<never>>
  = decoder(right('invalid3s%%F%'));
const flattened2: Either<string, string> = flatten(decoder(right('invalid3s%%F%')));

l = decoded2;
//decoded2
//{ 
//  _tag: 'Right',
//  right: { _tag: 'Left', left: 'URIError: URI malformed' }
//}

console.log(l);
}
