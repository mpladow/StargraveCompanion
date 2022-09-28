import {Realm, createRealmContext} from '@realm/react';
import {schema} from '../realm';

const config = {
  schema: schema,
};
export default createRealmContext(config);
