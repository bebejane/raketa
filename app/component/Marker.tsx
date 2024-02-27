'use client'

import { useStore, shallow } from '@lib/store';
import s from './Marker.module.scss';
import cn from 'classnames';

export type Props = {
  hide?: boolean
}

export default function Marker({ hide }: Props) {

  const [layoutState, setLayoutState] = useStore(state => [state.layoutState, state.setLayoutState], shallow);

  if (hide) return null

  return (
    <div className={s.marker}>
      <div className={cn(s.mark, s[layoutState])} />
    </div>
  )
}