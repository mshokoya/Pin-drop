export type UPlacesHash = {[key: string]: IPlacesHash}

export type IKind = {[key: string]: {[key: string]: boolean}}

export interface IPlacesHash {
  type: string
  id: string
  geometry: { 
    type: string
    coordinates: [number, number] 
  }
  properties: {
    xid: string
    name: string
    rate: number
    osm: string
    wikidata: string
    kinds: string[]
  }
}

export interface IPlaces {
  type: string
  id: string
  geometry: { 
    type: string
    coordinates: [number, number] 
  }
  properties: {
    xid: string
    name: string
    rate: number
    osm: string
    wikidata: string
    kinds: string
  }
}

export interface IPlacesQuery {
  places: {
    type: string;
    features: IPlaces[];
  }
}