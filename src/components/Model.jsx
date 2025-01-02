import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'
import ModelView from './ModelView'
import { useRef, useState } from 'react'
import { yellowImg } from '../util'

import * as THREE from 'three'
import { Canvas } from '@react-three/fiber'
import { View } from '@react-three/drei'
import { models, sizes } from '../constants'
const Model = () => {
  const [size, setSize] = useState('small')
  const [modal, setModal] = useState({
    title: 'iPhone 15 Pro in Natural Titanium',
    color: ['#8F8A81', '#ffe7b9', '#6f6c64'],
    img: yellowImg,
  })

  // camera constrol for the modal view
  const cameraControlSmall = useRef()
  const cameraControlLarge = useRef()

  // modal
  const small = useRef(new THREE.Group())
  const large = useRef(new THREE.Group())

  // rotate
  const [smallRotation, setSmallRotation] = useState(0)
  const [largeRotation, setLargeRotation] = useState(0)

  useGSAP(() => {
    gsap.to('#heading', { opacity: 1, y: 0 })
  })
  return (
    <section className="common-padding">
      <div className="screen-max-width">
        <h1 id="heading" className="section-heading">
          Take a closer loook.
        </h1>

        <div className="flex flex-col items-center mt-5">
          <div className="w-full h-[75vh] md:h-[90vh] overflow-hidden relative">
            <ModelView
              index={1}
              groupRef={small}
              gsapType="view1"
              controlRef={cameraControlSmall}
              setRotationState={setSmallRotation}
              item={modal}
              size={size}
              setSize={setSize}
            />
            <ModelView
              index={2}
              groupRef={large}
              gsapType="view2"
              controlRef={cameraControlLarge}
              setRotationState={setLargeRotation}
              item={modal}
              size={size}
              setSize={setSize}
            />
            <Canvas
              className="w-full h-full"
              style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                overflow: 'hidden',
              }}
              eventSource={document.getElementById('root')}
            >
              <View.Port />
            </Canvas>
          </div>
          <div className="mx-auto w-full">
            <p className="text-sm font-light text-center mb-5">{modal.title}</p>
            <div className="flex-center">
              <ul className="color-container">
                {models.map((model, i) => (
                  <li
                    key={i}
                    className="w-6 h-6 rounded-full cursor-pointer mx-2"
                    style={{ backgroundColor: model.color[0] }}
                    onClick={() => {
                      setModal(model)
                      setSmallRotation(0)
                      setLargeRotation(0)
                    }}
                  />
                ))}
              </ul>
              <button className="size-btn-container">
                {sizes.map(({ label, value }) => (
                  <span
                    key={label}
                    className="size-btn"
                    style={{
                      backgroundColor: size === value ? 'white' : 'transparent',
                      color: size === value ? 'black' : 'white',
                    }}
                    onClick={() => setSize(value)}
                  >
                    {label}
                  </span>
                ))}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
export default Model
