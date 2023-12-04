import React, {useEffect, useState} from 'react'
import "@google/model-viewer";



function ModelView() {
    // const [isLoading, setIsLoading] = useState(true);

    // const handleModelLoad = () => {
    //     setIsLoading(false);
    // };
  return (
    <>
        <model-viewer className='h-[200px]' id="model"  disable-zoom progressive src="desktop/desktop.gltf" camera-orbit="90deg 50deg">
        </model-viewer>
    </>
  )
}

export default ModelView