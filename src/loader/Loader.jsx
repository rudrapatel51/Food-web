// Loader.js

import React from "react";

const Loader = () => {
    return (
        <div style={loaderContainerStyle}>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 100 100"
                preserveAspectRatio="xMidYMid"
                width="100"
                height="100"
                style={{ shapeRendering: "auto", display: "block" }}
            >
                <g>
                    <circle fill="#7fe15b" r="8" cy="23" cx="50">
                        <animate
                            values="23;77;23"
                            keyTimes="0;0.5;1"
                            keySplines="0.45 0 0.9 0.55;0 0.45 0.55 0.9"
                            calcMode="spline"
                            repeatCount="indefinite"
                            dur="1s"
                            attributeName="cy"
                        ></animate>
                    </circle>
                    <g></g>
                </g>
            </svg>
        </div>
    );
};

const loaderContainerStyle = {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    zIndex: 9999,
};

export default Loader;
