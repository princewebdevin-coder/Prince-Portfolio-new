import { useEffect, useRef } from "react";
import * as THREE from "three";
import setCharacter from "./utils/character";
import setLighting from "./utils/lighting";
import { useLoading } from "../../context/LoadingProvider";
import handleResize from "./utils/resizeUtils";
import {
  handleMouseMove,
  handleTouchEnd,
  handleHeadRotation,
  handleTouchMove,
} from "./utils/mouseUtils";
import setAnimations from "./utils/animationUtils";
import { setProgress } from "../Loading";

const Scene = () => {
  const canvasDiv = useRef<HTMLDivElement | null>(null);
  const hoverDivRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef(new THREE.Scene());
  const { setLoading } = useLoading();

  useEffect(() => {
    if (canvasDiv.current) {
      let rect = canvasDiv.current.getBoundingClientRect();
      let container = { width: rect.width, height: rect.height };
      const aspect = container.width / container.height;
      const scene = sceneRef.current;
      const isMobile = window.matchMedia("(max-width: 600px)").matches;

      const renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: !isMobile,
        powerPreference: isMobile ? "low-power" : "high-performance",
      });
      renderer.setSize(container.width, container.height);
      renderer.setPixelRatio(
        isMobile ? Math.min(window.devicePixelRatio, 1.5) : window.devicePixelRatio
      );
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1;
      canvasDiv.current.appendChild(renderer.domElement);

      const camera = new THREE.PerspectiveCamera(14.5, aspect, 0.1, 1000);
      camera.position.z = 10;
      camera.position.set(0, 13.1, 24.7);
      camera.zoom = 1.1;
      camera.updateProjectionMatrix();

      let headBone: THREE.Object3D | null = null;
      let screenLight: any | null = null;
      let mixer: THREE.AnimationMixer;
      let loadedCharacter: THREE.Object3D | null = null;

      const clock = new THREE.Clock();
      const onResize = () => {
        if (loadedCharacter) {
          handleResize(renderer, camera, canvasDiv, loadedCharacter);
        }
      };
      window.addEventListener("resize", onResize);

      const light = setLighting(scene);
      let progress = setProgress((value) => setLoading(value));
      const { loadCharacter } = setCharacter(renderer, scene, camera);

      loadCharacter().then((gltf) => {
        if (gltf) {
          const animations = setAnimations(gltf);
          hoverDivRef.current && animations.hover(gltf, hoverDivRef.current);
          mixer = animations.mixer;
          let character = gltf.scene;
          loadedCharacter = character;
          scene.add(character);
          headBone = character.getObjectByName("spine006") || null;
          screenLight = character.getObjectByName("screenlight") || null;
          progress.loaded().then(() => {
            setTimeout(() => {
              light.turnOnLights();
              animations.startIntro();
            }, 2500);
          });
        }
      });

      let mouse = { x: 0, y: 0 },
        interpolation = { x: 0.1, y: 0.2 };

      const onMouseMove = (event: MouseEvent) => {
        handleMouseMove(event, (x, y) => (mouse = { x, y }));
      };
      let debounce: number | undefined;
      const onTouchMove = (event: TouchEvent) => {
        handleTouchMove(event, (x, y) => (mouse = { x, y }));
      };
      const landingDiv = document.getElementById("landingDiv");
      const onTouchStart = () => {
        window.clearTimeout(debounce);
        debounce = setTimeout(() => {
          landingDiv?.addEventListener("touchmove", onTouchMove, {
            passive: true,
          });
        }, 200);
      };

      const onTouchEnd = () => {
        window.clearTimeout(debounce);
        landingDiv?.removeEventListener("touchmove", onTouchMove);
        handleTouchEnd((x, y, interpolationX, interpolationY) => {
          mouse = { x, y };
          interpolation = { x: interpolationX, y: interpolationY };
        });
      };

      document.addEventListener("mousemove", onMouseMove);
      if (landingDiv) {
        landingDiv.addEventListener("touchstart", onTouchStart);
        landingDiv.addEventListener("touchend", onTouchEnd);
      }
      let animationFrameId = 0;
      let lastFrameTime = 0;
      const minimumFrameInterval = isMobile ? 1000 / 30 : 0;
      const animate = (time: number) => {
        if (document.hidden) return;
        animationFrameId = requestAnimationFrame(animate);
        if (time - lastFrameTime < minimumFrameInterval) return;
        lastFrameTime = time;
        if (headBone) {
          handleHeadRotation(
            headBone,
            mouse.x,
            mouse.y,
            interpolation.x,
            interpolation.y,
            THREE.MathUtils.lerp
          );
          light.setPointLight(screenLight);
        }
        const delta = clock.getDelta();
        if (mixer) {
          mixer.update(delta);
        }
        renderer.render(scene, camera);
      };
      const startAnimation = () => {
        if (!document.hidden && animationFrameId === 0) {
          clock.getDelta();
          animationFrameId = requestAnimationFrame(animate);
        }
      };
      const stopAnimation = () => {
        window.cancelAnimationFrame(animationFrameId);
        animationFrameId = 0;
      };
      const onVisibilityChange = () => {
        if (document.hidden) {
          stopAnimation();
        } else {
          startAnimation();
        }
      };
      document.addEventListener("visibilitychange", onVisibilityChange);
      startAnimation();
      return () => {
        window.clearTimeout(debounce);
        stopAnimation();
        scene.clear();
        renderer.dispose();
        window.removeEventListener("resize", onResize);
        document.removeEventListener("visibilitychange", onVisibilityChange);
        if (canvasDiv.current) {
          canvasDiv.current.removeChild(renderer.domElement);
        }
        if (landingDiv) {
          document.removeEventListener("mousemove", onMouseMove);
          landingDiv.removeEventListener("touchstart", onTouchStart);
          landingDiv.removeEventListener("touchend", onTouchEnd);
          landingDiv.removeEventListener("touchmove", onTouchMove);
        }
      };
    }
  }, []);

  return (
    <>
      <div className="character-container">
        <div className="character-model" ref={canvasDiv}>
          <div className="character-rim"></div>
          <div className="character-hover" ref={hoverDivRef}></div>
        </div>
      </div>
    </>
  );
};

export default Scene;
