import React, { useState, useEffect, useRef } from 'react';

function ImageComponent({ src, alt, className, height, width }) {
    const [isLoaded, setIsLoaded] = useState(false);
    const imgRef = useRef(null);

    useEffect(() => {
        const img = new window.Image();
        img.src = src;

        setIsLoaded(false); // Reset the loading state

        // Check if the image is already loaded
        if (img.complete) {
            setIsLoaded(true);
            if (imgRef.current) {
                imgRef.current.classList.remove('image-loading');
            }
        } else {
            img.onload = () => {
                setIsLoaded(true);
                if (imgRef.current) {
                    imgRef.current.classList.add('fade-in');
                }
            };
        }
    }, [src]);

    useEffect(() => {
        const imgElement = imgRef.current;

        const handleImageAnimationEnd = () => {
            if (imgElement) {
                imgElement.classList.remove('fade-in');
            }
        };

        if (imgElement) {
            imgElement.addEventListener('animationend', handleImageAnimationEnd);
        }

        return () => {
            if (imgElement) {
                imgElement.removeEventListener('animationend', handleImageAnimationEnd);
            }
        };
    }, [isLoaded]);

    return (
        <div style={{ position: 'relative', minWidth: width, height: height }}>
            <div
                className="image-placeholder"
                style={{ position: 'absolute', width: width, height: height, backgroundColor: '#ccc' }}
            />
            <img
                alt={alt}
                src={src}
                className={`${className} ${isLoaded ? '' : 'image-loading'}`}
                height={height}
                width={width}
                ref={imgRef}
                style={{ position: 'absolute', top: 0, left: 0 }}
                loading="lazy"
            />
        </div>
    );
}

export default ImageComponent;