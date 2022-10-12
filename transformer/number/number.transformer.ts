import { Transformable } from '../interface/transformable.interface';

export class NumberTransform implements Transformable {
  transform(item: any) {
    console.log(`Working with ${JSON.stringify(item, null, 2)}`);
  }
}
