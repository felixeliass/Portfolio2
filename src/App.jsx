import { useState, useLayoutEffect, useRef, useEffect, lazy, Suspense } from 'react'
import { TypeAnimation } from 'react-type-animation';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MotionPathPlugin } from 'gsap/dist/MotionPathPlugin';
import "@google/model-viewer";
import Card from "./component/Card"
// const ModelView = lazy(() => import('./component/ModelView'));
gsap.registerPlugin(MotionPathPlugin, ScrollTrigger);

const LoadingScreen = () => {
  return (
    <div>
      <h1 className='text-white'>Loading...</h1>
    </div>
  );
};

function App() {
  const triggerRef = useRef(null);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth)
  const [windowHeight, setWindowHeight] = useState(window.innerHeight)
  const [isLoading, setIsLoading] = useState(true);
  const setWindowDimensions = () => {
    setWindowWidth(window.innerWidth)
    setWindowHeight(window.innerHeight)
  }

  useEffect(() => {
    window.addEventListener('resize', setWindowDimensions);

    return () => {
      window.removeEventListener('resize', setWindowDimensions)
    }
  }, [])
  useLayoutEffect(() => {

    // create our context. This function is invoked immediately and all GSAP animations and ScrollTriggers created during the execution of this function get recorded so we can revert() them later (cleanup)
    let ctx = gsap.context(() => {

      const t1 = gsap.timeline({
        scrollTrigger: {
          trigger: triggerRef.current,
          start: "top top",
          // end:"end end",
          end: () => "+=9000", //+ document.querySelector(".img1").offsetHeight,
          pin: true,
          // markers: true,
          anticipatePin: 1,
          scrub: 4,
        },
        defaults: { ease: "none" }
      });
      t1
        .fromTo(".img1", { scale: 1 }, { scale: 1.03 })
        .fromTo("#effect", { scale: 0 }, { scale: 1, duration: 2 })
        .to(".t_div", { opacity: 1 }, 0)

        .fromTo("model-viewer",
          { opacity: 1 },
          {
            x: 500 * windowWidth / 1920,
            attr: {
              ["camera-orbit"]: "120deg 50deg",
            }, duration: 4
          }, 0)
        .fromTo(".div2", { opacity: 0, x: -200 }, { opacity: 1, x: 200 * windowWidth / 1920, duration: 4 })
        .to("model-viewer",
          {
            x: -400 * windowWidth / 1920,
            attr: {
              ["camera-orbit"]: "50deg 50deg",
            }, duration: 4
          }, "+=2")
        .to(".div2", { opacity: 0, y: 1000 }, "<0")
        .fromTo(".div3", { opacity: 0, x: -200 }, { opacity: 1, x: 1000 * windowWidth / 1920, duration: 4 })
        .to("model-viewer",
          {
            x: 500 * windowWidth / 1920,
            attr: {
              ["camera-orbit"]: "120deg 50deg",
            }, duration: 4
          }, "+=2")
        .to(".div3", { opacity: 0, y: 1000 }, "<0")
        .fromTo(".div4", { opacity: 0, x: -200 }, { opacity: 1, x: 200 * windowWidth / 1920, duration: 4 })
        .to(".div4", { opacity: 0, y: 1000 }, "+=2")
        .fromTo(".div5", { opacity: 0, x: -200 }, { opacity: 1, x: 200 * windowWidth / 1920, duration: 4 })
        .to(".div5", { opacity: 0, y: 1000 }, "+=2")
        .to("model-viewer", { opacity: 0, y: 1500, duration: 4 }, "<0")
        .to(".t_div", { y: -200, opacity: 0 })
        .to("#effect", { y: -2000, opacity: 0 })
        .fromTo(".div6", { opacity: 0 }, { opacity: 1, y: 0, duration: 2 })
        .to(".div6", { opacity: 0.8 }, "+=2")


    }); // <- IMPORTANT! Scopes selector text

    return () => ctx.revert(); // cleanup
  }, []);

  useEffect(() => {
    Fluid.initialize();

  }, [])

  return (
    <>
      <div className='div1 relative' ref={triggerRef}>
        <canvas id="effect" className='z-[5]'></canvas>
        <img className="w-screen h-screen  brightness-90 blur z-2 fixed img1" src="13.png" />
        <div className='flex flex-row w-full justify-center t_div z-10 pt-5 2xl:pt-16 px-5 absolute'>

          <div className='text-red p-3 text-bold font-Inter text-3xl 2xl:text-[60px]'>
            <p style={{
              color : "wheat",
              fontSize : "170px",
          
              fontFamily : "Brush Script MT",
              textShadow : "2px 2px 4px black",

            }}>
              Hi, there
            </p>
          </div>
          <img className='w-20 z-20' src='./icon.png' />
        </div>
          {/* <img className='w-20 z-20' src='./icon.png' /> */}
        <div className='flex w-full justify-center t_div z-10 pt-20 2xl:pt-40 px-5 text-2xl 2xl:text-[50px] absolute'>
          <TypeAnimation
            sequence={[
              // Same substring at the start will only be typed once, initially
              'Senior full-stack developer',
              500,
              'I like to use MERN stack and Next.js, tailwindcss',
              3000,
              'Beautiful animation with GSAP + Three.js',
              2000,
              'High quality + Correct deadline + Responsible',
              1500,
            ]}
            speed={50}
            className='text-white p-4 text-bold font-Inter  '
            repeat={Infinity}
          />
        </div>
        <model-viewer poster="./spinner.gif" camera-controls loading="eager" className='h-[200px]' id="model" disable-zoom progressive src="14.glb" camera-orbit="90deg 50deg">
        </model-viewer>
        <div className='flex grid grid-cols-3 lg:grid-cols-4 div2 w-[500px] mt-96 absolute z-10'>
          <div className='col-span-4 text-2xl 2xl:text-[40px] font-Inter text-white text-center'>Skills (front-end)</div>
          <div><a href="https://reactjs.org/" target="_blank" className=""><img className="m-3 w-20 2xl:w-24" src="https://profilinator.rishav.dev/skills-assets/react-original-wordmark.svg" alt="React" /></a></div>
          <div><a href="https://nextjs.org/" target="_blank" className=""><img className="m-3 w-20 2xl:w-24" src="https://profilinator.rishav.dev/skills-assets/nextjs.png" alt="NextJS" /></a></div>
          <div><a href="https://vuejs.org/" target="_blank" className=""><img className="m-3 w-20 2xl:w-24" src="https://profilinator.rishav.dev/skills-assets/vuejs-original-wordmark.svg" alt="Vue.js" /></a></div>
          <div><a href="https://graphql.org/" target="_blank" className=""><img className="m-3 w-20 2xl:w-24" src="https://profilinator.rishav.dev/skills-assets/graphql.png" alt="GraphQL" /></a></div>
          <div><a href="https://www.tailwindcss.com/" target="_blank" className=""><img className="m-3 w-20 2xl:w-24" src="https://profilinator.rishav.dev/skills-assets/tailwindcss.svg" alt="Tailwind CSS" /></a></div>
          <div><a href="https://mui.com/" target="_blank" className=""><img className="m-3 w-20 2xl:w-24" src="https://profilinator.rishav.dev/skills-assets/mui.png" alt="Material UI" /></a></div>
          <div><a href="https://greensock.com/gsap/" target="_blank" className=""><img className="m-3 w-20 2xl:w-24" src="./icon/gsap.png" alt="GSAP" /></a></div>
          <div><a href="https://threejs.org/" target="_blank" className=""><img className="m-3 w-20 2xl:w-24" src="./icon/three1.png" alt="Three.js" /></a></div>
        </div>
        <div className='flex grid grid-cols-3 lg:grid-cols-4 div3 w-[500px] mt-96 absolute z-20'>
          <div className='col-span-4  text-2xl 2xl:text-[40px] font-Inter text-white text-center'>Skills (back-end)</div>
          <div><a href="https://nodejs.org/" target="_blank" className=""><img className="m-3 w-20 2xl:w-24" src="https://profilinator.rishav.dev/skills-assets/nodejs-original-wordmark.svg" alt="Node.js" /></a></div>
          <div><a href="https://www.php.net/" target="_blank" className=""><img className="m-3 w-20 2xl:w-24" src="https://profilinator.rishav.dev/skills-assets/php-original.svg" alt="PHP" /></a></div>
          <div><a href="https://www.python.org/" target="_blank" className=""><img className="m-3 w-20 2xl:w-24" src="https://profilinator.rishav.dev/skills-assets/python-original.svg" alt="Python" /></a></div>
          <div><a href="https://dotnet.microsoft.com/download/dotnet-framework" target="_blank" className=""><img className="m-3 w-20 2xl:w-24" src="https://profilinator.rishav.dev/skills-assets/dot-net-original-wordmark.svg" alt=".NET" /></a></div>
          <div><a href="https://expressjs.com/" target="_blank" className=""><img className="m-3 w-20 2xl:w-24" src="https://profilinator.rishav.dev/skills-assets/express-original-wordmark.svg" alt="Express.js" /></a></div>
          <div><a href="https://laravel.com/" target="_blank" className=""><img className="m-3 w-20 2xl:w-24" src="https://profilinator.rishav.dev/skills-assets/laravel-plain-wordmark.svg" alt="Laravel" /></a></div>
          <div><a href="https://www.djangoproject.com/" target="_blank" className=""><img className="m-3 w-20 2xl:w-24" src="https://profilinator.rishav.dev/skills-assets/django-original.svg" alt="Django" /></a></div>
          <div><a href="https://flask.palletsprojects.com/" target="_blank" className=""><img className="m-3 w-20 2xl:w-24" src="https://profilinator.rishav.dev/skills-assets/flask.png" alt="Flask" /></a></div>
        </div>
        <div className='flex grid grid-cols-3 lg:grid-cols-4 div4 w-[500px] mt-96 absolute z-20'>
          <div className='col-span-4  text-2xl 2xl:text-[40px] font-Inter text-white text-center my-6'>Skills (DevOps)</div>
          <div className='mx-2 '><a href="https://aws.amazon.com/" target="_blank" className=""><img className="w-24 2xl:w-32" src="https://profilinator.rishav.dev/skills-assets/amazonwebservices-original-wordmark.svg" alt="AWS" /></a></div>
          <div className='mx-2 '><a href="https://cloud.google.com/" target="_blank" className=""><img className="w-24 2xl:w-32" src="https://profilinator.rishav.dev/skills-assets/google_cloud-icon.svg" alt="GCP" /></a></div>
          <div className='mx-2 '><a href="https://kubernetes.io/" target="_blank"><img className="w-24 2xl:w-32" src="https://profilinator.rishav.dev/skills-assets/kubernetes-icon.svg" alt="Kubernetes" /></a></div>
          <div className='mx-2 '><a href="https://www.linux.org/" target="_blank" className=""><img className="w-24 2xl:w-32" src="https://profilinator.rishav.dev/skills-assets/linux-original.svg" alt="Linux" /></a></div>

        </div>
        <div className='flex grid grid-cols-3 lg:grid-cols-4 div5 w-[500px] mt-96 absolute z-20'>
          <div className='col-span-4  text-2xl 2xl:text-[40px] font-Inter text-white text-center'>Contact me</div>
          {/* <div className='text-center m-3 tooltip' data-tip="LucktoSky, live:.cid.e3c55b10dae3083"><a href="https://join.skype.com/invite/rmacF1BAJRfh" target="_blank" className=""><i className="fa-brands fa-skype text-white  text-[60px] 2xl:text-[80px]"></i></a></div> */}
          <div className='text-center m-3 tooltip' data-tip="toSky777"><a href="https://telegram.org" target="_blank" className=""><i className="fa-brands fa-telegram  text-white  text-[60px] 2xl:text-[80px]"></i></a></div>
          <div className='text-center m-3 tooltip' data-tip="mypanda1990"><a href="https://discord.com" target="_blank" className=""><i className="fa-brands fa-discord text-white  text-[60px] 2xl:text-[80px]"></i></a></div>
          <div className='text-center m-3 tooltip' data-tip="Hello! , cloud.warrytomas51@gmail.com " ><a href="mailto:cloud.warrytomas51@gmail.com?subject='Hello Apollo!'&body='I jsut see your portfolio'" target="_blank" className=""><i className="fa-brands fa-google text-white  text-[60px] 2xl:text-[80px]"></i></a></div>
          {/* <div className='text-center m-3 tooltip' data-tip="mypanda1990"><a href="https://discord.com" target="_blank" className=""><i className="fa-brands fa-discord text-white  text-[60px] 2xl:text-[80px]"></i></a></div> */}
        </div>
        <div className='grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 flex w-full flex-row px-12 mt-3 justify-evenly z-20 div6'>
          <Card
            src="./game.png"
            title="Imasia App1"
            text="You can explore town with character. You can explore town with character. You can explore town with character"
            stack="Three.js, React, GSAP, Vite"
            // url="https://chrome.google.com/webstore/detail/futbot/kmjemgkhfhpjfblpbcomcpbnofglmnmn?hl=en-US"
            // github="https://github.com/LucktoSky/character_walk"
            vw={windowWidth}
          />
          <Card
            src="./6.png"
            title="FUTBot"
            text="Automate your sniping easily. FUTBot is a specialized tool designed for sniping players in FIFA, to earn hundreds of thousands of coins."
            stack="jQuery, Vite, Bootstarp 5"
            // url="https://chrome.google.com/webstore/detail/futbot/kmjemgkhfhpjfblpbcomcpbnofglmnmn?hl=en-US"
            // github="https://github.com/LucktoSky/FUTBot-extension"
            vw={windowWidth}
          />
          <Card
            src="./7.GIF"
            title="Drone website"
            text="Drones are an efficient and cost effective way to monitor and assess damages without putting your team at risk. With"
            stack="Three.js, React, GSAP, Vite, Tailwindcss"
            // url="https://falconclover-4jyjbm--96895306497410.stormkit.dev"
            // github="https://github.com/LucktoSky/drone-website"
            vw={windowWidth}
          />

          <Card
            src="./mobile.png"
            title="Ours App"
            text="The idea behind “Ours” is an investing platform that allows you to work with a group of
            your selected peers. "
            stack="React Native, Firebase, Plaid Api, "
            // url="https://play.google.com/store/apps/details?id=ours.recipes.for.kids"
            // github="https://github.com/LucktoSky/ours----React-Native--Firebase"
            vw={windowWidth}
          />
          <Card
            src="./5.png"
            title="FUTBot dashboard"
            text="Automate your sniping easily. FUTBot is a specialized tool designed for sniping players in FIFA, to earn hundreds of thousands of coins."
            stack="Node, Express, MongoDB, React, Vite"
            // url="https://xzenmart.com"
            // github="https://github.com/LucktoSky/common-manage"
            vw={windowWidth}
          />
          <Card
            src="./city.png"
            title="Imasia App2"
            text="Threads emerge as a formidable competitor to Twitter, backed by Meta and Instagram, in a clash of social media titans."
            stack="Django,ML, MongoDB, React, Vite"
            // url="https://www.immersiveasia.io/"
            // github="https://github.com/LucktoSky/character_walk"
            vw={windowWidth}
          />
        </div>
      </div>

    </>
  )
}

export default App
