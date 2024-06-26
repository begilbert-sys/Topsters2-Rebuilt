'use client';
import { useState } from 'react';
import styles from '@/app/page.module.css';

import Album from '@/app/components/album';


export default function Search({chartData, setChartData}) {
    const [albumResults, setAlbumResults] = useState([]);
    async function handleSubmit(e) {
        e.preventDefault();
        const albumName = e.target.albumName.value;
        if (albumName === '') {
            return;
        }
        const response = await fetch(`/api?albumName=${albumName}`, {
            method: "GET"
        });
        const urls = await response.json();
        setAlbumResults(urls);
    }
    let images = [];
    for (let i = 0; i < albumResults.length; i++) {
        images.push(
            <Album
                key={i}
                albumData={albumResults[i]}
                chartData={chartData}
                setChartData={setChartData}
            />
        );
    }

    return (
    <div>
        <form method="GET" onSubmit={handleSubmit}>
            <input 
                className = {styles.searchBar} 
                placeholder="Album, artist, or URL"
                name="albumName"
            />
            <button type="submit">Go</button>
        </form>
        <div className={styles.imageTable}>
            {images}
        </div>
    </div>
    )
}