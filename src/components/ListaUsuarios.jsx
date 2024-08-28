import {useEffect, useState} from "react";
import {deleteUser, freezeUser, getUsers} from "../api/api.js";
import {IconCircleOff, IconFlame, IconIceCream, IconTrashX} from "@tabler/icons-react";

const LoadingPlaceholder = () => {
    return (
        <div className={"w-full h-40 flex items-center justify-center"}>
            <div className="animate-pulse w-10/12 flex gap-2">
                <div className={"bg-green-200 w-10 h-10 rounded-full"}></div>
                <div className={"bg-green-200 w-20 h-10"}></div>
                <div className={"bg-green-200 w-full h-10"}></div>
            </div>
        </div>
    );

}

const ListaUsuarios = () => {
    const [listaUsuarios, setListaUsuarios] = useState([]);
    useEffect(() => {
        const fetchListaUsuarios = async () => {
            try {
                const response = await getUsers();
                setListaUsuarios(response.data);
                console.log(listaUsuarios);
            } catch (err) {
                console.log(err);
            }
        };

        fetchListaUsuarios();
    }, [listaUsuarios]);

    return (
        <div>
            {listaUsuarios.length === 0 ? <LoadingPlaceholder/> : listaUsuarios.map((usuario) => {
                return (
                    <div key={usuario.id} className={"flex gap-4 items-center p-4 border-2 border-gray-300 rounded-md"}>
                        <div className={"bg-green-50 w-fit p-2  "}>
                            <div className={"mb-2"}>
                                <div className={"bg-green-200 w-10 h-10 rounded-full"}></div>
                                <div>
                                    <h1 className={"font-semibold"}>{usuario.nome}</h1>
                                    <p>{usuario.email}</p>
                                </div>
                            </div>

                            <div className={"flex gap-1 mb-1 w-full"}>
                                <button
                                    onClick={() => deleteUser(usuario.id).then(() => console.log("Usuário removido!"))}
                                    className={"text-white flex w-full h-full gap-0.5 items-center bg-blue-600 rounded font-medium p-1 pe-2"}>
                                    <IconTrashX size={20}/>
                                    Remover
                                </button>

                                <button
                                    onClick={()=>freezeUser(usuario.id).then(() => console.log("Usuário congelado!"))}
                                    className={"text-white flex w-full w-min-30 h-full gap-0.5 items-center bg-blue-600 rounded font-medium p-1 pe-4"}>
                                    <IconIceCream size={20}/>
                                    Congelar
                                </button>
                            </div>
                            <div className={"flex gap-1 w-full"}>
                                <button
                                    className={"text-white h-full w-fit flex gap-0.5 items-center bg-customGreen-mid rounded font-medium p-1 pe-3"}>
                                    <IconCircleOff size={20}/>
                                    Zerar
                                </button>

                                <button
                                    className={"text-white h-full w-fit flex gap-0.5 items-center bg-customGreen-mid rounded font-medium p-1"}>
                                    <IconFlame size={20}/>
                                    Adicionar dia
                                </button>
                            </div>
                        </div>
                        <div className={"flex flex-wrap w-full"}>
                            {usuario.diasDeOfensiva <= 0 ? "" : (
                                [...Array(usuario.diasDeOfensiva)].map((e, i) => {
                                    return <img key={i} className={`${usuario.congelado && ("grayscale")}`}
                                                    width={"55px"}
                                                    src={"https://em-content.zobj.net/source/microsoft-teams/363/fire_1f525.png"}
                                                    alt={"fogo"}/>
                                    }
                                )
                            )}
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default ListaUsuarios;