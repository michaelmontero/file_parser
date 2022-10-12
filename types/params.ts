import { Hook } from '../interface/hook.interface';
import { Transformable } from '../interface/transformable.interface';

export type Params = {
  transform: Transformable;
  beforeAll?: Hook;
  afterAll?: Hook[];
};
