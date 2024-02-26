'use client'

import s from './Menu.module.scss';
import cn from 'classnames';
import { useStore, shallow } from '@lib/store';
import { useScrollInfo } from 'next-dato-utils/hooks';
import Fade from './Fade';
import { useEffect, useState } from 'react';

export type Props = {
  allProjects: StartQuery['allProjects']
}

export default function Menu({ allProjects }: Props) {

  const { scrolledPosition } = useScrollInfo();
  const [layoutState, setLayoutState] = useStore(state => [state.layoutState, state.setLayoutState], shallow);
  const [currentProject, setCurrentProject] = useState<string | null>(null);

  useEffect(() => {
    const projects = document.getElementById('projects');
    if (!projects) return
    const projectElements = projects.getElementsByTagName('li');
    const projectPositions = Array.from(projectElements).map((el) => {
      const rect = el.getBoundingClientRect();
      return {
        id: el.id,
        top: rect.top,
        bottom: rect.bottom,
        height: rect.height,
      }
    });

    const currentProject = projectPositions.find((el) => el.top < 0 && el.bottom > 0) ?? projectPositions[0];
    setCurrentProject(currentProject.id);

  }, [scrolledPosition])


  return (
    <nav
      className={cn(s.menu, layoutState === 'menu' && s.active, layoutState === 'project' && s.inactive)}
      onMouseEnter={() => setLayoutState('menu')}
    >
      <h2>PROJECTS</h2>
      <ul>
        {allProjects.map(({ id, title, slug }, idx) =>
          <li key={id} className={cn(currentProject === slug && s.selected)}><a href={`#${slug}`}>{title}</a></li>
        )}
      </ul>
      <Fade hide={layoutState === 'menu'} />
    </nav >
  )
}