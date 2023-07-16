import styles from './Header.module.css'

export default function Header() {
  return (
    <header className={styles.header}>
        <form className={styles.form_login}>
            <label className='form-label'>Username:
                <input type="text" className='form-control' />
            </label>
            <label className='form-label' >Password:
                <input type="password" className='form-control' />
            </label>
            
            <button type='button' className='btn btn-primary'>Login</button>
        </form>
    </header>
  )
}
