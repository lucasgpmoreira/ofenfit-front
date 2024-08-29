import logo from "./assets/logo.png"
import CadastroUsuario from "./components/CadastroUsuario.jsx";
import ListaUsuarios from "./components/ListaUsuarios.jsx";
import {useEffect, useState} from "react";
import {IconSearch, IconX} from "@tabler/icons-react";
import {buscarCliente, getUsers} from "./api/api.js";

function App() {
    const [refresh, setRefresh] = useState(false);
    const [imageClicked, setImageClicked] = useState(false);
    const [listaUsuarios, setListaUsuarios] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {

        const fetchListaUsuarios = async () => {
            try {
                let response;
                if (searchTerm === "") {
                    response = await getUsers();
                } else {
                    if (!isNaN(searchTerm)) {
                        response = await buscarCliente('', searchTerm);
                    } else {
                        response = await buscarCliente(searchTerm);
                    }
                }
                setListaUsuarios(response.data);
                console.log(response.data);
            } catch (err) {
                setListaUsuarios([])
                console.log(err);
            }
        };

        fetchListaUsuarios();
    }, [refresh]);


    return (
        <div className={"mb-4"}>
            <div style={{zIndex: 10000, position: 'relative'}}
                 onClick={() => setImageClicked(!imageClicked)}
                 className={`flex items-center justify-center w-100 mb-4 transition-all ${imageClicked && "-translate-y-3/4"}`}>

                <div className="w-fit bg-gray-900 rounded-b-3xl" style={{zIndex: 2, position: 'relative'}}>
                    <img width={"400px"} src={logo} alt={"logo"}/>
                </div>
            </div>

            <div className=" relative bottom-16 w-full flex gap-2 items-center justify-center"
                 style={{zIndex: 1, position: 'relative'}}>
                Pesquisar:
                <div>
                    <input value={searchTerm} onChange={(e)=> {
                        setSearchTerm(e.target.value)
                    }} type="text" className={"border-2 border-gray-400 rounded-lg"}/>
                </div>
                <IconSearch onClick={()=>setRefresh(!refresh)} size={20} className={"bg-customGreen-mid text-white w-8 h-8 p-1.5 rounded-xl"}/>
                <IconX onClick={()=> {
                    setSearchTerm("")
                    setRefresh(!refresh)
                }} size={20} className={"bg-customGreen-mid text-white w-8 h-8 p-1.5 rounded-xl"}/>

            </div>


            <div className={"mx-4 md:mx-12 flex flex-col gap-3"}>
                {listaUsuarios.length > 0 && (<ListaUsuarios refresh={refresh} setRefresh={setRefresh} listaUsuarios={listaUsuarios} setListaUsuarios={setListaUsuarios}/>)}
                <hr className={"border-2 border-gray-300"}/>
                <div>
                    <CadastroUsuario refresh={refresh} setRefresh={setRefresh}/>
                </div>
            </div>
        </div>
    )
}

export default App
