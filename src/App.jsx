import logo from "./assets/logo.png"
import CadastroUsuario from "./components/CadastroUsuario.jsx";
import ListaUsuarios from "./components/ListaUsuarios.jsx";

function App() {


    return (
        <>
            <div className={"flex items-center justify-center w-100 mb-4"}>
                <div className="w-fit bg-gray-900 rounded-b-3xl">
                    <img width={"400px"} src={logo} alt={"logo"}/>
                </div>
            </div>




            <div className={"mx-12 flex flex-col gap-3"}>
                <ListaUsuarios />
                <div>
                    <CadastroUsuario />
                </div>
            </div>
        </>
    )
}

export default App
