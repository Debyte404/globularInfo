import React, { useEffect, useRef } from "react";
import Globe from "react-globe.gl";
import * as THREE from "three";

import { UserContext } from "../context/UserContext";

import axios from "axios";

const CLOUDS_IMG_URL = "/assets/clouds.png"; // Uses public/assets/clouds.png
const CLOUDS_ALT = 0.004;
const CLOUDS_ROTATION_SPEED = -0.006 * Math.PI / 180; // radians per frame

export default function GlobeWithLocation() {
  const globeEl = useRef();
  const locationRef = useRef(null);
  const intervalRef = useRef(null);

  const { setLongitude, setLatitude } = React.useContext(UserContext);

  const centerGlobeOnLocation = (lat, lng, tries = 0) => {
    if (
      !globeEl.current ||
      !globeEl.current.controls() ||
      typeof globeEl.current.pointOfView !== "function"
    ) {
      if (tries < 10) {
        setTimeout(() => centerGlobeOnLocation(lat, lng, tries + 1), 250);
      }
      return;
    }
    globeEl.current.pointOfView({ lat, lng, altitude: 2 }, 1500);
    globeEl.current.controls().autoRotate = false;
  };

  // Add clouds
  useEffect(() => {
    if (!globeEl.current) return;

    new THREE.TextureLoader().load(CLOUDS_IMG_URL, cloudsTexture => {
      const globeRadius = globeEl.current.getGlobeRadius();
      const clouds = new THREE.Mesh(
        new THREE.SphereGeometry(globeRadius * (1 + CLOUDS_ALT), 75, 75),
        new THREE.MeshPhongMaterial({ map: cloudsTexture, transparent: true })
      );
      globeEl.current.scene().add(clouds);

      // Animate clouds rotation
      (function rotateClouds() {
        clouds.rotation.y += CLOUDS_ROTATION_SPEED;
        requestAnimationFrame(rotateClouds);
      })();
    });
  }, []);

  // Ask for location, center globe, disable interaction, and retry if needed
  useEffect(() => {
    if (!globeEl.current) return;

    // Disable all user interaction
    const controls = globeEl.current.controls();
    controls.enableZoom = false;
    controls.enablePan = false;
    controls.enableRotate = false;
    controls.enableDamping = false;

    // Enable auto-rotation initially
    controls.autoRotate = true;
    controls.autoRotateSpeed = 0.35;

    // Get user location once and store it
    navigator.geolocation.getCurrentPosition(
      pos => {
        const { latitude, longitude } = pos.coords;
        console.log("User location:", latitude, longitude);
        setLongitude(longitude);
        setLatitude(latitude);
        locationRef.current = { lat: latitude, lng: longitude };
        // Center globe robustly
        centerGlobeOnLocation(latitude, longitude);

        // Set up interval to re-center every 4 seconds as a fallback
        intervalRef.current = setInterval(() => {
          if (locationRef.current) {
            centerGlobeOnLocation(
              locationRef.current.lat,
              locationRef.current.lng
            );
          }
        }, 4000);

        // Stop globe's auto-rotation after centering (first time)
        setTimeout(() => {
          controls.autoRotate = false;
        }, 1600);
      },
      err => {
        alert("Location permission denied or unavailable.");
        controls.autoRotate = false;
      }
    );

    // Cleanup interval on unmount
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
    // eslint-disable-next-line
  }, []);

  return (
    <div style={{pointerEvents: 'none', width: "100vw", height: "100vh" }}>
      <Globe
        ref={globeEl}
        globeImageUrl="//cdn.jsdelivr.net/npm/three-globe/example/img/earth-blue-marble.jpg"
        bumpImageUrl="//cdn.jsdelivr.net/npm/three-globe/example/img/earth-topology.png"
        backgroundColor="rgb(15, 15, 15)"
        animateIn={false}
      />
    </div>
  );
}
