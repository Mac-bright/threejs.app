import React from 'react'

import CustumButton from './CustomButton'

function FilePicker({file, setFile,readfile}) {
  console.log(file)
  return (
    <div className='filepicker-container'>
      <div className='flex-1 flex flex-col'>
        <input type="file" name="" id="file-upload" 
          accept='image/*'
          onChange={(e) => setFile(e.target.files[0])}
        />
        <label htmlFor='file-upload' className='filepicker-label'>
          Upload file
        </label>

        <p className='mt-2 text-gray-500 text-xs truncate'>
          {file === '' ? 'No file loaded': file.name}
        </p>
      </div>
      <div className="mt-4 flex flex-wrap gap-3">
        <CustumButton
          type={'outline'}
          title={'Logo'}
          handleClick={() => {readfile('logo')}}
          customStyles="text-xs"
        />
        <CustumButton
          type={'filled'}
          title={'Full'}
          handleClick={() => readfile('full')}
          customStyles="text-xs"
        />
      </div>
    </div>
  )
}

export default FilePicker