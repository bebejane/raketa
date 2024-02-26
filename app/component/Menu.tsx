'use client'
import s from '../page.module.scss';

export type Props = {
  allProjects: StartQuery['allProjects']
}

export default function Menu({ allProjects }: Props) {

  return (
    <nav>
      <h2>PROJECTS</h2>
      <ul>
        {allProjects.map(({ id, title }, idx) =>
          <li key={id}>{title}</li>
        )}
      </ul>
      <div className={s.fade}>
        <div className={s.gradient}></div>
        <div className={s.solid}></div>
      </div>
    </nav>
  )
}