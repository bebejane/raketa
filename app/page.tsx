import s from './page.module.scss'
import cn from 'classnames';
import { apiQuery } from 'next-dato-utils/api';
import { DraftMode, Block } from 'next-dato-utils/components';
import { AllProjectsDocument, } from '@graphql';
import { notFound } from 'next/navigation';
import Content from '../components/Content';
import * as BlockComponets from '@components/blocks';

export default async function Start() {


  const { allProjects, draftUrl } = await apiQuery<AllProjectsQuery, AllProjectsQueryVariables>(AllProjectsDocument, {
    tags: ['project']
  });

  if (!allProjects) return notFound();

  return (
    <>
      <header className={s.header}>
        <div className={s.top}>
          <h1>RAKETA</h1>
          <a>Contact</a>
        </div>
        <div className={s.intro}>
          <p>
            RAKETA is running as an ongoing experiment; a laboratory-in-progress – working interdisciplinary, in theory and practice, with projects in the area between art/architecture/philosophy/democracy. By creating alternative meeting places – spaces for talks, thoughts, discussions, workshops, and the unexpected, Raketa poses questions about the world and everything around us. The most important question being – how can we live together?
            Read more ›
          </p>
        </div>
      </header>
      <article className={cn(s.start)}>
        <nav><h2>PROJECTS</h2>
          <ul>
            <li>Volna.stream</li>
            <li>Inverted spacest</li>
            <li>Counterpoint</li>
          </ul>
          <div className={s.fade}><div className={s.gradient}></div><div className={s.solid}></div></div>
        </nav>
        <ul className={s.projects}>
          {allProjects?.map(({ id, title, description, collaborationWith, externalLink, year, visualPresentation }, idx) =>
            <li key={id}>
              <div className={s.meta}>
                <div className={s.wrapper}>
                  <h2>{title}</h2>
                  {year}
                  <h3>{collaborationWith}</h3>
                  {externalLink && <a href={externalLink}>{externalLink}</a>}
                </div>
                <div className={s.fade}><div className={s.gradient}></div><div className={s.solid}></div></div>

              </div>
              <div className={s.images}>
                {visualPresentation.map((block, idx) =>
                  <Block key={idx} data={block} components={BlockComponets} />
                )}
              </div>
              <div className={s.text}>
                <Content content={description} />
                <div className={s.fade}><div className={s.gradient}></div><div className={s.solid}></div></div>

              </div>
            </li>
          )}
        </ul>
      </article>
      <DraftMode url={draftUrl} tag={'project'} />
    </>
  )
}