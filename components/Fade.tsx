import s from './Fade.module.scss';
import cn from 'classnames';

export type Props = {
  hide?: boolean
}

export default function Fade({ hide }: Props) {


  return (
    <div className={cn(s.fade, hide && s.hide)}>
      <div className={s.gradient}></div>
      <div className={s.solid}></div>
    </div>
  )
}