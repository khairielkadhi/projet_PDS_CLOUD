import React from 'react'
import 
{BsCart3, BsGrid1X2Fill, BsFillArchiveFill, BsFillGrid3X3GapFill, BsPeopleFill, 
  BsListCheck, BsMenuButtonWideFill, BsFillGearFill,BsTable,BsPlusCircleFill}
 from 'react-icons/bs'
 import { FaSignOutAlt } from 'react-icons/fa';
 import logosopra from '../../images/SOPRASTERIA.png'

 function Sidebar({ openSidebarToggle, OpenSidebar, setCurrentPage }) {
    const handlePageChange = (pageName) => {
      setCurrentPage(pageName);
    }
   
    return (
      
        <aside id="sidebar" className="d-flex flex-column   gradient-custom-2 h-100 mb-4"  >
        <div className='sidebar-title'>
          <div className='sidebar-brand'>
          <img src={logosopra} alt="Sopra HR Software" className="img-fluid rounded-circle" />
          </div>
          <span className='icon close_icon' onClick={OpenSidebar}>X</span>
        </div>
  
        <ul className='sidebar-list'>
          <li className='sidebar-list-item'>
            <a href="#" onClick={() => handlePageChange('Dashboard')}>
              <BsGrid1X2Fill className='icon' /> Dashboards
            </a>
          </li>
          <li className='sidebar-list-item'>
            <a href="#" onClick={() => handlePageChange('dashboard')}>
            <BsTable className='icon' /> ListOfCandidate
            </a>
          </li>
          <li className='sidebar-list-item'>
            <a href="#" onClick={() => handlePageChange('Joboofer')}>
               <BsPlusCircleFill className='icon' /> Joboofers
            </a>
          </li>
          <li className='sidebar-list-item'>
            <a href="#" onClick={() => handlePageChange('ListofManagers')}>
               <BsPlusCircleFill className='icon' /> Add managers
            </a>
          </li>
          <li className='sidebar-list-item'>
            <a href="#" onClick={() => handlePageChange('Joboofer')}>
            <FaSignOutAlt className='icon' /> LogOut
            </a>
          </li>
          {/* Ajoutez d'autres liens ici */}
        </ul>
      </aside>
    );
  }
  
  export default Sidebar;