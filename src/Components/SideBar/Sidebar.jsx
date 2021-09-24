import "./sidebar.css"

import logo from '../../assets/AvaStake.png'

function Sidebar() {
    return (
        <>
            <div className="sidebar sidebar-res">
                <div class="sidebar__top">
                    <h3 class="heading-secondary">
                        <img style={{ width: '130px' }} src={logo} alt='logoAva'/>
                    </h3>
                    <div className="sidebar__menu">
                        <a class="sidebar__link" href="http://"><i class="fas fa-coins sidebar__link--icon"></i>Stake AVA</a> 
                    </div>
                </div>
                <div className="sidebar__social sidebar__social--desktop">
                    <a class="sidebar__social-link" href="https://t.me/AvaStake"><i class="fab fa-telegram-plane sidebar__social-link--icon"></i></a>
                    <a class="sidebar__social-link" href="https://twitter.com/avastake/"><i class="fab fa-twitter sidebar__social-link--icon"></i></a>
                </div>
            </div>
        </>
    )
}

export default Sidebar
{/* <i class="fab fa-twitter"></i> */ }
{/* <i class="fab fa-telegram-plane"></i> */ }