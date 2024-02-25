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
      <article className={cn(s.start)}>
        <ul>
          {allProjects?.map(({ id, title, description, collaborationWith, externalLink, year, visualPresentation }, idx) =>
            <li key={id}>
              <h2>{title}</h2>
              {year}
              <h3>{collaborationWith}</h3>
              <Content content={description} />
              {externalLink && <a href={externalLink}>{externalLink}</a>}
              <div className={s.presentation}>
                {visualPresentation.map((block, idx) =>
                  <Block key={idx} data={block} components={BlockComponets} />
                )}
              </div>
            </li>
          )}
        </ul>
      </article>
      <DraftMode url={draftUrl} tag={'project'} />
    </>
  )
}