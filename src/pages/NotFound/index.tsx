import { Container, Row, Col } from 'react-bootstrap'
import styles from './index.module.sass'
import classNames from 'classnames'

export default function NotFound () {
	return (
		<div className="flex-col flex-1 center-all">
			<p>Oops. Page not found.</p>
		</div>
	)
}
