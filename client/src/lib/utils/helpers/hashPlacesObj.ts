import {IPlaces, UPlacesHash, IKind, IUnsplash} from '../types';
import _isEmpty from 'lodash.isempty';

const NUM_OF_IMAGES = 10;

interface Args {
  places: IPlaces[];
  hash: UPlacesHash;
  kinds: IKind;
  images?: IUnsplash
}

export const hashPlacesObj = ({hash, places, kinds, images}: Args): 
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
        if (images){
          const rnum = Math.floor(Math.random() * NUM_OF_IMAGES)
          const imageUrls = images.results[rnum].urls
          obj.properties.images = imageUrls
        }
        
        newHash[obj.id] = newPlaces[obj.id] = obj;
      }
  });

  return {
    hash: newHash, 
    kinds: newKinds,
    newPlaces
  }
}