type obj<K> = {[key: string]: K}

class HashMap<T>{
  readonly hashmap: obj<T> = {}
  constructor(
    private key: string
  ){}

  createUniqueHashMap(objArr: T[]){
    objArr.forEach((obj: T) => {
      this.hashmap[this.key] = obj;
    });
  }

  append(arr: T[], key?:string): obj<T> {
    this.newValuesOnly(arr, this.hashmap, key);
    return this.hashmap;
  }

  newValuesOnly(
    arr: T[],
    hashmap?: obj<T>,
    key?: string
    ): obj<T> {
    const newValues: obj<T> = {}

    arr.forEach((obj) => {
      // @ts-ignore
      const objKey: string = obj[key || this.key]
      if ((hashmap || this.hashmap)[objKey]) {
        return;
      } else {
        (hashmap || this.hashmap)[objKey] = obj
        newValues[objKey] = obj
      }
    })

    return newValues;
  }

}

export default HashMap