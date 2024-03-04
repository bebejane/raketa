'use client'

import { use, useEffect, useRef, useState } from 'react';
import s from './About.module.scss';
import cn from 'classnames';
import Content from "@components/Content";
import { useStore } from '@lib/store';

export type Props = {
  about: StartQuery['about']
}

export default function About({ about }: Props) {

  const [showExtended, setShowExtended] = useState(false);
  const [extendedHeight, setExtendedHeight] = useState(0);
  const [setLayoutState] = useStore(state => [state.setLayoutState]);
  const extendedRef = useRef<HTMLDivElement>(null);
  useEffect(() => {

    if (extendedRef.current) {
      setExtendedHeight(extendedRef.current.scrollHeight);
    }
  }, [extendedRef.current]);


  return (
    <div className={s.about} onMouseEnter={() => setLayoutState('default')}>
      <Content content={about.intro} className={s.text} />

      <div className={cn(s.extendedWrap)} ref={extendedRef} style={{ maxHeight: showExtended ? extendedHeight : 0 }}>
        <Content content={about.extended} />
      </div>

      <span className={s.readMore} onClick={() => setShowExtended(!showExtended)}>
        {!showExtended ? 'Read more ›' : '‹ Read less'}
      </span>
    </div>
  )
}