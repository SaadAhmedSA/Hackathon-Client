import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Card = ({title,src}) => {
  return (
    <div className="card card-compact bg-base-100 w-96 shadow-xl">

    
    <div className="card-body">
        <div className='flex items-center gap-3'>

    <Image src={src} width={70} height={70} alt='card-image' />
      <h2 className="card-title">{title}</h2>

        </div>
      <p>Saylani offer you Diffrent type of loan Which help you to fulfilled your needs.</p>
      <div className="card-actions justify-start">
        <button className="btn btn-primary">
            <Link href={"/apply"} >Apply loan</Link>
            </button>
      </div>
    </div>
  </div>
  )
}

export default Card