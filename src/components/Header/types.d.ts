import { HTMLAttributes } from 'react';

interface IHeaderProps extends HTMLAttributes<HTMLElement> {
  renderMajorAction?: FC;
  renderMinorAction?: FC;
}
