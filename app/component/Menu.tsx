'use client'

import s from './Menu.module.scss';
import cn from 'classnames';
import { useStore, shallow } from '@lib/store';
import Fade from './Fade';

export type Props = {
  allProjects: StartQuery['allProjects']
}

export default function Menu({ allProjects }: Props) {

  const [menuState, setMenuState] = useStore(state => [state.menuState, state.setMenuState], shallow);

  return (
    <nav
      className={cn(s.menu, s[menuState])}
      onMouseEnter={() => setMenuState('active')}
      onMouseLeave={() => setMenuState('inactive')}
    >
      <h2>PROJECTS</h2>
      <ul>
        {allProjects.map(({ id, title, slug }, idx) =>
          <li key={id}><a href={`#${slug}`}>{title}</a></li>
        )}
      </ul>
      <Fade />
    </nav >
  )
}