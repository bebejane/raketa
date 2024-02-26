'use client'

import { Block } from 'next-dato-utils/components';
import s from '../page.module.scss';
import Content from "@components/Content";
import * as BlockComponets from '@components/blocks';

export type Props = {
  allProjects: StartQuery['allProjects']
}

export default function Menu({ allProjects }: Props) {

  return (
    <ul className={s.projects}>
      {allProjects?.map(({ id, title, description, collaborationWith, externalLink, year, visualPresentation }) =>
        <li key={id}>
          <div className={s.meta}>
            <div className={s.wrapper}>
              <h2>{title}</h2>
              {year}
              <h3>{collaborationWith}</h3>
              {externalLink && <a href={externalLink}>{externalLink}</a>}
            </div>
            <div className={s.fade}><div className={s.gradient}></div><div className={s.solid}></div></div>
          </div>
          <div className={s.images}>
            {visualPresentation.map((block, idx) =>
              <Block key={idx} data={block} components={BlockComponets} />
            )}
          </div>
          <div className={s.text}>
            <Content content={description} />
            <div className={s.fade}>
              <div className={s.gradient}></div>
              <div className={s.solid}></div>
            </div>
          </div>
        </li>
      )}
    </ul>
  )
}