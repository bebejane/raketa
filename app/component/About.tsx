'use client'

import s from '../page.module.scss';
import Content from "@components/Content";

export type Props = {
  about: StartQuery['about']
}

export default function About({ about }: Props) {

  return (
    <div className={s.intro}>
      <Content content={about.intro} />
      <span>Read more ›</span>
      <Content content={about.extended} />
    </div>
  )
}