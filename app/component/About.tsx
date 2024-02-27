'use client'

import { useState } from 'react';
import s from './About.module.scss';
import Content from "@components/Content";
import { useStore } from '@lib/store';

export type Props = {
  about: StartQuery['about']
}

export default function About({ about }: Props) {

  const [showExtended, setShowExtended] = useState(false);
  const [setLayoutState] = useStore(state => [state.setLayoutState]);

  return (
    <div className={s.about} onMouseEnter={() => setLayoutState('default')}>
      <Content content={about.intro} className={s.text} />
      {showExtended && <Content content={about.extended} />}
      <span className={s.readMore} onClick={() => setShowExtended(!showExtended)}>
        {!showExtended ? 'Read more ›' : '‹ Read less'}
      </span>
    </div>
  )
}