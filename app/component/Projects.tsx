'use client'

import { Block } from 'next-dato-utils/components';
import s from './Projects.module.scss';
import cn from 'classnames'
import Content from "@components/Content";
import * as BlockComponets from '@components/blocks';
import { useStore, shallow } from '@lib/store';
import Fade from './Fade';

export type Props = {
  allProjects: StartQuery['allProjects']
}

export default function Menu({ allProjects }: Props) {

  const [menuState, setMenuState] = useStore(state => [state.menuState, state.setMenuState], shallow);

  return (
    <ul className={s.projects}>
      {allProjects?.map(({ id, slug, title, description, collaborationWith, externalLink, year, visualPresentation }) =>
        <li id={slug} key={id}>
          {menuState !== 'hidden' &&
            <div className={s.meta}>
              <div className={s.wrapper}>
                <h2>{title}</h2>
                {year}
                <h3>{collaborationWith}</h3>
                {externalLink && <a href={externalLink}>{externalLink}</a>}
              </div>
              <div className={s.fade}><div className={s.gradient}></div><div className={s.solid}></div></div>
            </div>
          }
          <div className={s.images}>
            {visualPresentation.map((block, idx) =>
              <Block key={idx} data={block} components={BlockComponets} />
            )}
          </div>
          {menuState !== 'active' &&
            <div className={cn(s.text, menuState === 'hidden' && s.active)} onMouseEnter={() => setMenuState('hidden')} onMouseLeave={() => setMenuState('inactive')}>
              <Content content={description} />
              <Fade hide={menuState === 'hidden'} />
            </div>
          }
        </li>
      )}
    </ul>
  )
}