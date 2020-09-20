import {IPlacesHash, UPlacesHash, IKind, IUnsplash} from '../types';
import _isEmpty from 'lodash.isempty';
import faker from 'faker';

const NUM_OF_IMAGES = 10;

interface Args {
  places: IPlacesHash[];
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
  const oldHash = {...hash};
  const newPlaces: UPlacesHash = {
    hash: {},
    length: 0
  };
  const newKinds: IKind  = {...kinds};
  let newHashLen = 0;


  places.forEach((obj: IPlacesHash) => {
    obj.properties.kinds
      .split(',')
      .forEach((k: any) => {
        if (newKinds[k]){
          newKinds[k].length++
          newKinds[k]['hash'][obj.id] = true
        } else {
          newKinds[k] = {
            length: 1,
            hash: {[obj.id]: true}
          }
        }
      });
    
      if (!oldHash.hash[obj.id]) {

        if (!obj.properties.name) {
          obj.properties.name = `${faker.company.companyName()} ${faker.company.companySuffix()}`
        }

        if (images){
          const rnum = Math.floor(Math.random() * NUM_OF_IMAGES)
          const imageUrls = images.results[rnum].urls
          obj.properties.images = imageUrls
        }

        obj.properties.address = {
          country: faker.address.country(),
          county: faker.address.county(),
          city: faker.address.city(),
          streetAddress: faker.address.streetAddress(),
          
        }
        obj.properties.website = faker.internet.url()
        obj.properties.phone = faker.phone.phoneNumber()
        obj.properties.description = faker.lorem.paragraph();

        newHashLen++
        oldHash.hash[obj.id] = newPlaces.hash[obj.id] = obj;
      }
  });
  
  oldHash.length = oldHash.length + newHashLen
  newPlaces.length = newHashLen

  return {
    hash: oldHash, 
    kinds: newKinds,
    newPlaces
  }
}