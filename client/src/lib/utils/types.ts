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

export interface IUnsplash {
  total: number;
  total_pages: number;
  results: [
    {
      id: string;
      created_at: Date;
      updated_at: Date;
      promoted_at: any;
      width: number;
      height: number;
      color: string;
      description: string;
      alt_description: string;
      urls: {
        ra: string;
        full: string;
        regular: string;
        small: string;
        thumb: string;
      },
      links: {
        self: string;
        html: string;
        download: string;
        download_location: string;
      },
      categories: [];
      likes: number;
      liked_by_user: boolean;
      current_user_collections: [];
      sponsorship: any;
      user: {
        id: string;
        updated_at: Date;
        username: string;
        name:string;
        first_name: string;
        last_name: string;
        twitter_username: any;
        portfolio_url: any;
        bio: any;
        location: any;
        links: {
          self: string;
          html: string;
          photos: string;
          likes: string;
          portfolio: string;
          following: string;
          followers: string;
        },
        profile_image: {
          small: string;
          medium: string;
          large: string;
        },
        instagram_username: null;
        total_collections: number;
        total_likes: number;
        total_photos: number;
        accepted_tos: boolean;
      },
      tags: { [key:string]: string }[]
    },
  ]
}