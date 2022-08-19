
import { useAppSelector } from '../../hooks';
import style from './style.module.css';

function ErrorMessage(): JSX.Element | null {

  const {error} = useAppSelector((state) => state);

  return (error)
    ? <div className={style['error-message']}>{error}</div>
    : null;

}

export default ErrorMessage;
