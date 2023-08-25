
import Login from "@/src/login"
export default function LLogin(){
  //   const router=useRouter();
  //   const [valid,setValid]=useState(false);  
  //   const [loading,setLoading]=useState(true);
  //   useEffect(() => {
  //       // Check if the user is logged in
  //       console.log(localStorage.getItem('isLoggedIn'),localStorage.getItem('id'))
  //       const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  //       const userId = localStorage.getItem('id');
  //       const role=localStorage.getItem('role')
  //       if (isLoggedIn && userId&&role=='employee') {
  //         setValid(true);
  //       router.push({pathname:'/home',query:{id:userId}},'/home')
  //       } else {
  //         setValid(false);
  //       }
  //     }, []);
  //   setTimeout(()=>{setLoading(false)},500)
  //  return <div>

  //   {loading&&<div className="w-full h-screen  flex justify-center items-center" >
  //   <div className="w-10 h-10 rounded-full bg-slate-200 ml-2 border-t-2 border-solid border-black animate-spinn">
  //        </div>
  //        </div>}
  //  {!loading&&(valid?'':<Login/>)}

  //  </div>
  return <div>
    <Login/>
  </div>
}
export function getServerSideProps(context:any){
  const jwt=require('jsonwebtoken')
  const {parseCookies}=require('nookies')
  const {token}=parseCookies(context);
  if(token){
      const decodedPayLoad=jwt.decode(token);
      const {isLoggedIn,id,role}=decodedPayLoad;
      if(isLoggedIn && role=='employee'){
        return{
             redirect:{
            destination:`/home`,
            permanent:false
        }
    } }
    if(isLoggedIn && role=='admin'){
      return{
           redirect:{
          destination:`/admin`,
          permanent:false
      }
  }
     }
    }
          return {
              props:{value:'Invalid ID'}
          }
   

}