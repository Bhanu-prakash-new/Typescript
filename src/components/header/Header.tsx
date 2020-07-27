import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { AppContextConsumer } from '../../App';
import 'primeicons/primeicons.css';
import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';
import { Dialog } from 'primereact/dialog';
import './Header.scss';
import { Link } from 'react-router-dom';

var dateFormat = require('dateformat');
interface HeaderProps {
    updateValues: any;
    time: string;
}

interface stateInterface {
    visible: boolean;
    menuItems: Array<{ name: string; route: string }>;
}

class Header extends Component<HeaderProps, stateInterface> {
    static propTypes = {};
    public timeriD: any;
    public state = {
        visible: false,
        menuItems: [
            { name: 'WEBSITE', route: '/test' },
            { name: 'TODOS', route: '/todos' },
            { name: 'FORMS', route: '/test' },
            { name: 'LOGIN', route: '/test' },
            { name: 'LOGOUT', route: '/test' }
        ]
    };
    tick() {
        this.props.updateValues(
            dateFormat(new Date(), 'dd-mmm-yyyy [HH:MM:ss]')
        );
    }
    componentDidMount() {
        this.timeriD = setInterval(() => this.tick(), 1000);
    }
    public render(): JSX.Element {
        const { time } = this.props;
        return (
            <div className='headerclass'>
                <div className='Navbar'>
                    <div className='Navbar-content'>
                        <ul className='menu-bar'>
                            {this.state.menuItems.map((item, key) => (
                                <li {...{ key }}>
                                    <Link to={item.route}>{item.name}</Link>
                                    <ul className='menu-bar-child'>
                                        {this.state.menuItems.map(
                                            (itemchild, key) => (
                                                <li {...{ key }}>
                                                    <span>
                                                        {itemchild.name}
                                                    </span>
                                                </li>
                                            )
                                        )}
                                    </ul>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
                <Dialog
                    header='Godfather I'
                    visible={this.state.visible}
                    style={{ width: '50vw' }}
                    modal={true}
                    onHide={() => this.setState({ visible: false })}
                >
                    The story begins as Don Vito Corleone, the head of a New
                    York Mafia family, oversees his daughter's wedding. His
                    beloved son Michael has just come home from the war, but
                    does not intend to become part of his father's business.
                    Through Michael's life the nature of the family business
                    becomes clear. The business of the family is just like the
                    head of the family, kind and benevolent to those who give
                    respect, but given to ruthless violence whenever anything
                    stands against the good of the family.
                </Dialog>
                {this.props.children}
            </div>
        );
    }
}
const withUserContext = (Component: any) => {
    return (props: any) => {
        return (
            <AppContextConsumer>
                {({ ...contextProps }) => {
                    return <Component {...props} {...contextProps} />;
                }}
            </AppContextConsumer>
        );
    };
};

export default withUserContext(Header);
