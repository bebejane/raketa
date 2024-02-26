'use client'

import { useState } from 'react';
import s from './About.module.scss';
import Content from "@components/Content";

export type Props = {
  about: StartQuery['about']
}

export default function About({ about }: Props) {

  const [showExtended, setShowExtended] = useState(false);

  return (
    <div className={s.about}>
      <Content content={about.intro} className={s.text} />
      {showExtended && <Content content={about.extended} />}
      <span className={s.readMore} onClick={() => setShowExtended(!showExtended)}>
        {!showExtended ? 'Read more ›' : 'Read less'}
      </span>
    </div>
  )
}