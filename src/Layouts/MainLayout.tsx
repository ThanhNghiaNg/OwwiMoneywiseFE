import { ReactNode } from 'react';
import Header from '../components/Header/Header'

type Props = {children: ReactNode}

export default function MainLayout(props: Props) {
  return (
    <div>
        <Header/>
        {props.children}
    </div>
  )
}