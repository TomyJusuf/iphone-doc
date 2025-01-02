import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'
import { heroVideo, smallHeroVideo } from '../util/index'
import { useState } from 'react'
import { useEffect } from 'react'
const Hero = () => {
  const [videoSrc, setVideoSrc] = useState(
    window.innerWidth < 760 ? smallHeroVideo : heroVideo
  )

  const handlerVidioSrcSet = () => {
    if (window.innerWidth < 760) {
      setVideoSrc(smallHeroVideo)
    } else {
      setVideoSrc(heroVideo)
    }
  }

  useEffect(() => {
    window.addEventListener('resize', handlerVidioSrcSet)
    return () => {
      window.removeEventListener('resize', handlerVidioSrcSet)
    }
  }, [])

  useGSAP(() => {
    gsap.to('#hero', {
      opacity: 1,
      delay: 1.5,
    })

    gsap.to('#cta', {
      overflow: 'hidden',
      y: window.innerWidth < 759 ? -40 : -250,
      opacity: 1,
      delay: 2.8,
      duration: 1,
      ease: 'power4.out',
    })
  }, [])
  return (
    <section className="w-full nav-height bg-black relative ">
      <div className="h-5/6 w-full flex-center flex-col">
        <p id="hero" className="hero-title">
          iPhone 15 Pro
        </p>
        <div className="md:w-10/12 w-9/12">
          <video
            autoPlay={true}
            playsInline={true}
            muted
            key={videoSrc}
            className="pointer-events-none"
          >
            <source src={videoSrc} type="video/mp4" />
          </video>
        </div>
      </div>
      <div
        id="cta"
        className="flex flex-col items-center opacity-0 translate-y-20"
      >
        <a href="#highlights" className="btn">
          Buy
        </a>
        <p className="font-normal text-xl">
          Fur €120/monatlich oder €1,000 abbonieren{' '}
        </p>
      </div>
    </section>
  )
}
export default Hero
