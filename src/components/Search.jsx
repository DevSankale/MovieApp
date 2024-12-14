import { useEffect } from "react"
import styles from "./search.module.css"


export default function Search({ movie, setMovie, results, setResults, URL, API_KEY,debouncedMovie,setDebouncedMovie}){
  useEffect(()=>{
    const handler = setTimeout(()=>{
      setDebouncedMovie(movie);
    },0);
    return () => clearTimeout(handler); 
  }, [movie,URL,API_KEY,setResults]);
  
  useEffect(()=>{
    if (!debouncedMovie) return;
    async function fetchMovie(){
     const res = await fetch(`${URL}?api_key=${API_KEY}&query=${debouncedMovie}`)
     const data = await res.json();
     setResults(data.results || []);
     console.log(data)
    }
    fetchMovie()
  },[debouncedMovie])
  console.log(movie)
  
  return (
    <div>
      <div className={styles.searchContainer}>
      <input 
      className={styles.search}
      type="text"
      onChange={((e)=>setMovie(e.target.value))}
      value={movie}
      placeholder="Enter Movie Name"
      />
    </div>
   
    </div>
    
  )
}