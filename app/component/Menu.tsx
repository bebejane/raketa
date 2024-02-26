'use client'

import s from './Menu.module.scss';
import cn from 'classnames';
import { useStore, shallow } from '@lib/store';
import Fade from './Fade';
import { useEffect, useState } from 'react';

export type Props = {
  allProjects: StartQuery['allProjects']
}

export default function Menu({ allProjects }: Props) {

  const [layoutState, setLayoutState] = useStore(state => [state.layoutState, state.setLayoutState], shallow);
  const [currentProject, setCurrentProject] = useState<string | null>(null);

  useEffect(() => {
    const projects = document.getElementById('projects');
    if (!projects) return
    const projectElements = projects.getElementsByTagName('li');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setCurrentProject(entry.target.id);
        }
      });
    }, { threshold: 0.1 });

    Array.from(projectElements).forEach((el) => observer.observe(el));
    return () => observer.disconnect();

  }, [])

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