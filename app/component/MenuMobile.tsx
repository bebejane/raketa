'use client'

import s from './MenuMobile.module.scss';
import cn from 'classnames';
import { useStore } from '@lib/store';
import { useEffect, useRef, useState } from 'react';

export type Props = {
  allProjects: StartQuery['allProjects']
}

export default function MenuMobile({ allProjects }: Props) {

  const [layoutState, desktop] = useStore(state => [state.layoutState, state.desktop]);
  const [open, setOpen] = useState(false);

  return (
    <nav className={cn(s.menuMobile)}>
      <h2 onClick={() => setOpen(!open)}>PROJECTS</h2>
      {open &&
        <ul>
          {allProjects.map(({ id, title, slug }, idx) =>
            <li key={id} className={cn()}>
              <a href={`#${slug}`}>{title}</a>
            </li>
          )}
        </ul>
      }
    </nav >
  )
}