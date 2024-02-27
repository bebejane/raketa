'use client'

import s from './Menu.module.scss';
import cn from 'classnames';
import { useStore } from '@lib/store';
import Fade from './Fade';
import { useEffect, useRef, useState } from 'react';
import useIsDesktop from '@lib/hooks/useIsDesktop';

export type Props = {
  allProjects: StartQuery['allProjects']
}

export default function Menu({ allProjects }: Props) {

  const [layoutState, setLayoutState, setDesktop] = useStore(state => [state.layoutState, state.setLayoutState, state.setDesktop]);
  const [currentProject, setCurrentProject] = useState<string | null>(null);
  const isScrolling = useRef(false);

  const desktop = useIsDesktop();
  useEffect(() => { setDesktop(desktop); }, [desktop])

  useEffect(() => {
    const projects = document.getElementById('projects');
    if (!projects) return
    const projectElements = projects.getElementsByTagName('li');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !isScrolling.current) {
          setCurrentProject(entry.target.id);
        }
      });
    }, { threshold: 0.1 });

    Array.from(projectElements).forEach((el) => observer.observe(el));
    return () => observer.disconnect();

  }, [])

  const handleClick = (e: React.MouseEvent) => {
    const href = (e.target as HTMLAnchorElement).href;
    const id = href.split('#')[1];
    isScrolling.current = true;
    setCurrentProject(id);
    setTimeout(() => isScrolling.current = false, 1000);
  }

  return (
    <nav
      className={cn(s.menu, layoutState === 'menu' && s.active, layoutState === 'project' && s.inactive)}
      onMouseEnter={() => setLayoutState('menu')}
    >
      <h2>PROJECTS</h2>
      <ul>
        {allProjects.map(({ id, title, slug }, idx) =>
          <li key={id} className={cn(currentProject === slug && s.selected)}>
            <a href={`#${slug}`} onClick={handleClick}>{title}</a>
          </li>
        )}
      </ul>
      <Fade hide={layoutState === 'menu'} />
    </nav >
  )
}