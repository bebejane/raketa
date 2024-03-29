
import s from './page.module.scss'
import { apiQuery } from 'next-dato-utils/api';
import { DraftMode } from 'next-dato-utils/components';
import { notFound } from 'next/navigation';
import { StartDocument } from '../graphql';
import About from './component/About';
import Menu from './component/Menu';
import Projects from './component/Projects';
import Marker from './component/Marker';
import MenuMobile from './component/MenuMobile';

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
          <a href="mailto:raketa@raketa.nu">Contact</a>
        </div>
        <About about={about} />
      </header>
      <MenuMobile allProjects={allProjects} />
      <Marker />
      <article className={s.article}>
        <Menu allProjects={allProjects} />
        <Projects allProjects={allProjects} />
      </article>
      <DraftMode url={draftUrl} tag={['project', 'about']} />
    </>
  )
}