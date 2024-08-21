import './App.css';
import React, { useEffect, useState } from 'react';
import { Auth } from './components/auth';
import { db ,auth,storage} from './config/firebase';
import {getDocs, collection, addDoc,deleteDoc,doc,updateDoc} from 'firebase/firestore'
import { ref,uploadBytes } from 'firebase/storage';

function App() {
  const [movies,setMovies]=useState([])
  const [updateTitle,setUpdateTitle] = useState("edhavadhu name  vaikanum")

  const movieCollectionReference = collection(db,"movies")
  const getMovieList = async ()=>{
    try{
      const data = await getDocs(movieCollectionReference);
      const filterData = data.docs.map((doc)=>({...doc.data(), id:doc.id}))
      // console.log(data);
      console.log({filterData});
      setMovies(filterData)
      
    }catch(e){
      console.error(e)
    } 
}
  useEffect(()=>{
    
    getMovieList()

  },[])

  const submittedTheNewData = async() =>{
    try{
      await addDoc(movieCollectionReference,{
      title:newMovieName,
      rating:newRating,
      receivedAward:newReceivedAward,
      userId:auth?.currentUser?.uid
    })
    getMovieList()
  }
  catch(e){
    console.error(e)
    console.log(e)
  }
}
  const DeleteTheNewData = async(id) =>{
    try{
      const commingData = doc(db,"movies",id);
      await deleteDoc(commingData);
      getMovieList()
  }
  catch(e){
    console.error(e)
    console.log(e)
  }
}
  const UpdateTheNewData = async(id) =>{
    try{
      const commingData = doc(db,"movies",id);
      await updateDoc(commingData,{title:updateTitle});
      getMovieList() 
  }
  catch(e){
    console.error(e)
    console.log(e)
  }
}
const uploadFiles = async() =>{
  if (!FileUpload) return ;
  try{
    const filesReference = ref(storage,`movieFiles/${FileUpload.name}`)
    await uploadBytes(filesReference,FileUpload);
    alert('Sucessfully uploaded')
    console.log("sucessfully uploaded")
}
catch(e){
  alert('SomeThing went worng see in console')
  console.error(e)
  console.log(e)
}
}

  const [newMovieName,setNewMovie] = useState("")
  const [newRating,setNewRating] = useState(0)
  const [newReceivedAward,setNewAward] = useState(true)
  const [FileUpload,setFileUpload] = useState(null)
  
  return (
    <div className="App">
  <Auth className="Auth"/>
  
  <div className="movie-form">
    <input type="text" onChange={(e) => setNewMovie(e.target.value)} placeholder="Movie Name" />
    <input type="number" onChange={(e) => setNewRating(e.target.value)} placeholder="Rating" />
    <input type="checkbox" checked={newReceivedAward} onChange={(e) => setNewAward(e.target.checked)} />
    <label htmlFor="checkbox">Received an OSCAR</label>
    <button onClick={submittedTheNewData}>SUBMIT</button>
  </div>
  
  <div className="movie-list">
    {movies.map((movie) => (
      <div key={movie.id}>
        <h1 style={{ color: movie.receivedAward ? 'green' : 'red' }}>{movie.title}</h1>
        <p>{movie.rating}</p>
        <button className="delete-da" onClick={() => DeleteTheNewData(movie.id)}>DELETE</button>
        <input type="text" placeholder="Update new title" onChange={(e) => setUpdateTitle(e.target.value)} />
        <button className="update-da" onClick={() => UpdateTheNewData(movie.id)}>UPDATE</button>
      </div>
    ))}
  </div>
  
  <div className="file-upload">
    <input type="file" name="file" id="file" onChange={(e) => setFileUpload(e.target.files[0])} />
    <button onClick={uploadFiles}>UPLOAD FILES</button>
  </div>
</div>



  );
}

export default App;
