import { useState } from 'react'
import './dashboard.css'
import Header from './header'
import Sidebar from './sidebar'
import Home from './home'
import ListOfCandidate from '../ListOfCandidate'
import JoboofersForm from '../JobOffer'
import ListofManagers from '../ListeOfManagers'
function Dashboard() {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);
  const [currentPage, setCurrentPage] = useState('Dashboard');

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle)
  }

  return (
    <div className='grid-container'>
      
      <Sidebar 
      openSidebarToggle={openSidebarToggle} 
      OpenSidebar={OpenSidebar} 
      setCurrentPage={setCurrentPage} // Passer la fonction pour mettre à jour la page
    />
     
     <div className="job-offer-form-container">
     
      <div className="list-of-candidate-container">
      {currentPage === 'dashboard' && <ListOfCandidate />}
      
      </div>
       
      {currentPage === 'Joboofer' && <JoboofersForm />}
      
      <div className="list-of-ListofManagers-container">
      {currentPage === 'Dashboard' && <Home />}
      {currentPage === 'ListofManagers' && <ListofManagers />}
     </div>
      </div>
     
      
      
      {/* Ajoutez d'autres pages ici */}
    </div>
  )
}

export default Dashboard