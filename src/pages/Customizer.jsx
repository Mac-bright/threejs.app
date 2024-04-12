import React,{useState,useEffect} from 'react'
import { snapshot, useSnapshot } from 'valtio'
import { AnimatePresence,color,motion } from 'framer-motion'

import config from '../config/config'
import state from '../store'
import {download, logoShirt, stylishShirt} from '../assets'
import {downloadCanvasToImage,reader} from '../config/helpers'
import {EditorTabs,FilterTabs,DecalTypes} from '../config/constants'
import { fadeAnimation, slideAnimation } from '../config/motion'
import { AiPicker,ColorPicker,CustomButton,FilePicker,Tab } from '../components'

const Customizer = () => {
  const snap = useSnapshot(state)

    const [file,setFile] = useState('')

    const [prompt,setPrompt] = useState('')
    const [generatingImg,setGeneratingImg] = useState('')


    const [activeEditorTab,setActiveEditorTab] = useState('')
    const [activeFilterTab,setActiveFilterTab] = useState({
      logoShirt:true,
      stylishShirt:false
    })

    // show tab content depending on the activeTab

    const generateTabContent = () => {
      switch(activeEditorTab){
        case 'colorpicker':
          return <ColorPicker/>
        case 'filepicker':
          return <FilePicker
                    file={file}
                    setFile={setFile}
                    readfile={readfile}
                  />
        case 'aipicker':
          return <AiPicker
                    prompt={prompt}
                    setPrompt = {setPrompt}
                    generatingImg={generatingImg}
                    handleSubmit={handleSubmit}
                  />
        default:
          null
      }
    }

    const handleSubmit = async (type) => {
      if(!prompt) return alert('Please enter a prompt')

      try{
        // call or backend to generate an ai image!
      }catch(error){
        alert(error)
      }finally{
        setGeneratingImg(false);
        setActiveEditorTab('')
      }
    } 

    const handleDecal = (type,result) => {
            const decalType = DecalTypes[type]

            state[decalType.stateProperty] = result;
            if(!activeFilterTab[decalType.filterTab]){
              handleActiveFilterTab(decalType.filterTab)
            }
    }



    const readfile = (type) =>{
      reader(file)
        .then((result) => {
          handleDecal(type,result)
          setActiveEditorTab('')
        })
    }

const handleActiveFilterTab = (tabName) => {
  switch (tabName) {
    case 'logoShirt':
      state.isLogoTexture = !activeFilterTab[tabName];
      break;
    case 'stylishShirt':
      state.isFullTexture = !activeFilterTab[tabName]
      break;
    default:
      state.isLogoTexture = true;
      state.isFullTexture = false;
  }
  setActiveFilterTab((prevState) => {
    return{
      ...prevState,[tabName]:!prevState[tabName]
    }
  })
}


  return (
   <AnimatePresence>
        {
          !snap.intro &&(
            <>
                <motion.div 
                  key={'custom'}
                  className='absolute top-0 left-0 z-10'
                  {...slideAnimation('left')}
                >
                  <div className='flex items-center min-h-screen'>
                    <div className='editortabs-container tabs'>
                      {EditorTabs.map((tab) => {
                        return(
                          <Tab
                            key={tab.name}
                            tab={tab}
                            handleClick={() => setActiveEditorTab(tab.name)}
                          />
                        )
                      })}
                      {generateTabContent()}
                    </div>
                  </div>
                </motion.div>

                <motion.div className='absolute z-10 top-5 right-5' {...fadeAnimation}>
                  <CustomButton
                  type='filled'
                  title='Go Back'
                  handleClick={() => state.intro = true}/>
                </motion.div>

                <motion.div className='filtertabs-container' {...slideAnimation('up')}>
                      {
                        FilterTabs.map((tab) => {
                          return(
                            <Tab
                            key={tab.name}
                            tab={tab}
                            handleClick={() => handleActiveFilterTab(tab.name)}
                            isFilterTab
                            isActiveTab={activeFilterTab[tab.name]}
                          />
                          )
                        })}
                        <button className='download-btn' onClick={downloadCanvasToImage}>
                          <img
                            src={download}
                            alt='download_image'
                            className='w-3/5 h-3/5 object-contain'
                          />
                        </button>
                </motion.div>
                
            </>
          )
        }
   </AnimatePresence>
  )
}

export default Customizer