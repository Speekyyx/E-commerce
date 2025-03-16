import React from 'react'
import Card from '@/components/Card'
import Navbar from '@/components/Navbar'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import cardsData from '../../data/cardsData'


const index = () => {
  return (
    <>
        <Navbar />
        <Header />
        <div className="card-container">
        {cardsData.map((card) => (
          <Card key={card.id} {...card} />
        ))}
      </div>
      <Footer />
    </>
  )
}

export default index