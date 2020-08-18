import React, {useState, useEffect, useRef, MutableRefObject} from 'react';

interface Props {
  map: MutableRefObject<HTMLElement | null>
}


const Marker = () => <div className='map__marker'/>

export const Map = ({map}: Props) => {
  return <div className='map' ref={el => (map.current = el)}/>
};