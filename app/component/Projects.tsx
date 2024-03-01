'use client'

import { Block } from 'next-dato-utils/components';
import s from './Projects.module.scss';
import cn from 'classnames'
import Content from "@components/Content";
import * as BlockComponets from '@components/blocks';
import { useStore } from '@lib/store';
import Fade from './Fade';
import { use, useEffect, useState } from 'react';

export type Props = {
  allProjects: StartQuery['allProjects']
}

export default function Menu({ allProjects }: Props) {

  const [layoutState, setLayoutState, desktop, showMobileMenu] = useStore(state => [state.layoutState, state.setLayoutState, state.desktop, state.showMobileMenu]);
  const [scrollMarginMobile, setScrollMarginMobile] = useState<number | null>(null);

  useEffect(() => { // Set scroll margin for mobile menu
    if (desktop) return setScrollMarginMobile(null);
    setTimeout(() => setScrollMarginMobile(document.getElementById('mobile-menu')?.scrollHeight ?? 0), 300)
  }, [desktop, showMobileMenu])

  return (

    <ul id="projects" className={s.projects}>
      {allProjects?.map(({ id, slug, title, description, collaborationWith, externalLink, year, visualPresentation }) =>
        <li id={slug} key={id} style={{ scrollMarginTop: scrollMarginMobile || undefined }}>
          <div
            className={cn(s.meta, layoutState === 'meta' ? s.active : layoutState === 'info' ? s.hidden : null)}
            onMouseEnter={() => setLayoutState('meta')}
          >
            <div className={s.wrapper}>
              <h2>{title}</h2>
              <span>{year}</span>
              <h3>{collaborationWith}</h3>
              {externalLink && <a href={externalLink}>Visit ›</a>}
            </div>
            <Fade hide={layoutState === 'meta'} />
          </div>
          <div
            className={cn(s.images, layoutState === 'default' ? s.active : null)}
            onMouseEnter={() => setLayoutState('default')}
          >
            {visualPresentation.map((block, idx) =>
              <Block key={idx} data={block} components={BlockComponets} />
            )}
          </div>
          <div
            className={cn(s.info, layoutState === 'info' ? s.active : layoutState !== 'default' ? s.hidden : null)}
            onMouseEnter={() => setLayoutState('info')}
          >
            <Content content={description} />
            <Fade hide={layoutState === 'info'} />
          </div>

        </li>
      )
      }
    </ul >

  )
}