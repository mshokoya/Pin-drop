import {IPlaces, UPlacesHash, IKind} from '../types';
import _isEmpty from 'lodash.isempty';
interface Args {
  places: IPlaces[];
  hash: UPlacesHash;
  kinds: IKind;
}

export const hashPlacesObj = ({hash, places, kinds}: Args): 
  {
    hash: UPlacesHash,
    kinds: IKind,
    newPlaces: UPlacesHash
  } => {
  const newHash = {...hash};
  const newPlaces: UPlacesHash = {};
  const newKinds: IKind  = {...kinds};

  places.forEach((obj: any) => {
    obj.properties.kinds
      .split(',')
      .forEach((k: any) => {
        return newKinds[k] 
          ? !_isEmpty(newKinds[k])
              ? newKinds[k][obj.id] = true
              : {[obj.id]: true}
          : newKinds[k] = {[obj.id]: true}
      });
    
      if (!newHash[obj.id]) {
        newHash[obj.id] = newPlaces[obj.id]  = obj;
      }
  });

  return {
    hash: newHash, 
    kinds: newKinds,
    newPlaces
  }
}