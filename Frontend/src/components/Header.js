import PropTypes from 'prop-types'
import Button from './Button';
import { useLocation } from 'react-router';

const Header = (props) => {

    const location = useLocation();

    return (
        <header className = 'header'>
            <h1>{props.title}</h1>
            { location.pathname === '/' ? <Button color = {props.visible ? 'red' : 'green'} 
            name = {props.visible ? 'Close' : 'Add'} 
            onClick = { props.toggleForm }/> : ''}
        </header>
    )
}

Header.defaultProps = {
    title: "Task Tracker"
};

Header.propTypes = {
    title: PropTypes.string.isRequired
};

export default Header