import React from 'react'

type FieldContainerProps = {
    children: React.ReactNode
}

const FieldContainer = ({ children }: FieldContainerProps) => {
  return (
    <div className='w-full flex flex-col sm:flex-row justify-center items-center gap-4'>
        {children}
    </div>
  )
}

export default FieldContainer