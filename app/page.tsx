
import s from './page.module.scss'
import { apiQuery } from 'next-dato-utils/api';
import { DraftMode } from 'next-dato-utils/components';
import { notFound } from 'next/navigation';
import { StartDocument } from '../graphql';
import About from './component/About';
import Menu from './component/Menu';
import Projects from './component/Projects';

export default async function Start() {

  const { allProjects, about, draftUrl } = await apiQuery<StartQuery, StartQueryVariables>(StartDocument, {
    tags: ['project', 'about']
  });

  if (!allProjects || !about) return notFound();

  return (
    <>
      <header className={s.header}>
        <div className={s.top}>
          <h1>RAKETA</h1>
          <a>Contact</a>
        </div>
        <About about={about} />
      </header>
      <article className={s.article}>
        <Menu allProjects={allProjects} />
        <Projects allProjects={allProjects} />
      </article>
      <DraftMode url={draftUrl} tag={['project', 'about']} />
    </>
  )
}