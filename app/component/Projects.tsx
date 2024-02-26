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

  const [layoutState, setLayoutState] = useStore(state => [state.layoutState, state.setLayoutState], shallow);

  return (
    <ul id="projects" className={s.projects}>
      {allProjects?.map(({ id, slug, title, description, collaborationWith, externalLink, year, visualPresentation }) =>
        <li id={slug} key={id}>
          <div
            className={cn(s.meta, layoutState === 'meta' && s.active, layoutState === 'project' && s.hidden)}
            onMouseEnter={() => setLayoutState('meta')}
          >
            <div className={s.wrapper}>
              <h2>{title}</h2>
              {year}
              <h3>{collaborationWith}</h3>
              {externalLink && <a href={externalLink}>Visit ›</a>}
            </div>
            <Fade hide={layoutState === 'meta'} />
          </div>
          <div
            className={cn(s.images, layoutState === 'project' && s.active)}
            onMouseEnter={() => setLayoutState('default')}
          >
            {visualPresentation.map((block, idx) =>
              <Block key={idx} data={block} components={BlockComponets} />
            )}
          </div>
          <div
            className={cn(s.text, layoutState === 'project' && s.active, (layoutState === 'menu' || layoutState === 'meta' && s.hidden))}
            onMouseEnter={() => setLayoutState('project')}
          >
            <Content content={description} />
            <Fade hide={layoutState === 'project'} />
          </div>

        </li>
      )}
    </ul>
  )
}